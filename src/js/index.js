$(document).ready(function () {
  var change = false;
  function _getAjax(url, callback) {
    var settings = {
      async: true,
      crossDomain: true,
      url: url,
      method: "GET",
    };

    $.ajax(settings)
      .done(function (response) {
        callback(response);
      })
      .fail(function (error) {
        callback(error);
      });
  }

  function nameBuildSelect() {
    _getAjax("https://dog.ceo/api/breeds/list/all", function (data) {
      var dogs = data.message;
      Object.keys(dogs).forEach(function (dog) {
        if (dogs[dog].length != 0) {
          dogs[dog].forEach(function (tipo) {
            $("#select-dog").append(
              "<option value='" +
                dog +
                " " +
                tipo +
                "'>" +
                dog +
                " " +
                tipo +
                "</option>"
            );
          });
        } else {
          $("#select-dog").append(
            "<option value='" + dog + "'>" + dog + "</option>"
          );
        }
      });
    });
  }

  function selectCor() {
    $("#select-color").on("change", function () {
      $(".js-nome-dog").css({ color: $(this).val() });
      $(".js-breed-dog").css({ color: $(this).val() });
      change = true;
    });
  }

  function selectFont() {
    $("#select-font").on("change", function () {
      $(".js-nome-dog").css({ "font-family": $(this).val() });
      $(".js-breed-dog").css({ "font-family": $(this).val() });
      change = true;
    });
  }

  function selectDog() {
    $("#select-dog").on("change", function () {
      var dog = $(this).val();
      var self = $(this).val();
      dog = dog.replace(" ", "/");
      _getAjax("https://dog.ceo/api/breed/" + dog + "/images/random", function (
        data
      ) {
        console.log(data);
        $(".js-breed-dog").text(self);
        $(".js-img-dog").attr("src", data.message);
        change = true;
      });
    });
  }

  function nomeDog() {
    $(".js-nome").on("keyup", function () {
      var nome = $(this).val();
      $(".js-nome-dog span").text(nome);
      $(".js-nome-dog").css({ display: "flex" });
      change = true;
    });
  }

  function save() {
    $(".js-save").on("click", function () {
      if (change == true) {
        var date = new Date();
        var dia = "0" + date.getDate();
        var mes = "0" + (date.getMonth() + 1);
        var ano = date.getFullYear();
        const horas = date.getHours();
        const minutos = "0" + date.getMinutes();
        var info = {};
        info["date"] =
          dia.substr(-2) +
          "/" +
          mes.substr(-2) +
          "/" +
          ano +
          " - " +
          horas +
          ":" +
          minutos.substr(-2);

        info["breed"] = $(".js-breed-dog").text();
        info["name"] = $(".js-nome-dog span").text();
        info["img"] = $(".js-img-dog").attr("src");
        info["cor"] = $("#select-color").val();
        info["font"] = $("#select-font").val();
        localStorage.setItem("info", JSON.stringify(info));
        $(".js-msg span").text("Salvo com Sucesso");
        $(".js-msg").css({ display: "flex" });
        infoStorege();
        setTimeout(function () {
          $(".js-msg").css({ display: "none" });
        }, 6000);
      } else {
        $(".js-msg span").text("Insira alguma informação");
        $(".js-msg").css({ display: "flex" });
        setTimeout(function () {
          $(".js-msg").css({ display: "none" });
        }, 6000);
      }
    });
  }

  function infoStorege() {
    var infoStorege = localStorage.getItem("info");
    if (infoStorege) {
      setTimeout(function () {
        info = JSON.parse(infoStorege);
        console.log(info);
        $(".js-nome-dog").css({ color: info.cor });
        $(".js-breed-dog").css({ color: info.cor });
        $(".js-nome-dog").css({ "font-family": info.font });
        $(".js-breed-dog").css({ "font-family": info.font });
        $(".js-breed-dog").text(info.breed);
        $(".js-img-dog").attr("src", info.img);
        $(".js-nome-dog span").text(info.name);
        if (info.name) {
          $(".js-nome-dog").css({ display: "flex" });
        }
        $(".js-date .date__info").text(info.date);
        $(".js-date").css({ display: "block" });
        $(".js-nome").val(info.name);
        $("#select-dog").val(info.breed);
        $("#select-color").val(info.cor);
        $("#select-font").val(info.font);
      }, 300);
    }
  }

  (function () {
    selectCor();
    selectFont();
    selectDog();
    nomeDog();
    nameBuildSelect();
    save();
    infoStorege();
  })();
});
