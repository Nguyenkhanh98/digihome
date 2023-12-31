/*
 * Camera Buttons
 */

var ACTION = {
  LOAD_DESIGN: "LOAD_DESIGN",
  SAVE_DESIGN: "SAVE_DESIGN",
};
var ACTION_FROM_PARENT = {
  LOAD_DESIGN_FROM_PARENT: "LOAD_DESIGN_CLIENT",
  INIT_FRAME: "INIT_FRAME",
};

let currentTemplate = null;

class Template {
  constructor(_templates) {
    if (Template.instance) {
      return Template.instance;
    }
    this.templates = _templates;
    this.currentTemplate = null;
    Template.instance = this;
  }
  setCurrentTemplate(id) {
    this.currentTemplate = this.templates.find((t) => t.id === id);
  }

  setTemplate(_templates) {
    this.templates = _templates;
  }

  getTemplates() {
    return this.templates;
  }
  getCurrentSelectTemplate() {
    return this.currentTemplate;
  }
}

var CameraButtons = function (blueprint3d) {
  var orbitControls = blueprint3d.three.controls;
  var three = blueprint3d.three;

  var panSpeed = 30;
  var directions = {
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4,
  };

  function init() {
    // Camera controls
    $("#zoom-in").click(zoomIn);
    $("#zoom-out").click(zoomOut);
    $("#zoom-in").dblclick(preventDefault);
    $("#zoom-out").dblclick(preventDefault);

    $("#reset-view").click(three.centerCamera);

    $("#move-left").click(function () {
      pan(directions.LEFT);
    });
    $("#move-right").click(function () {
      pan(directions.RIGHT);
    });
    $("#move-up").click(function () {
      pan(directions.UP);
    });
    $("#move-down").click(function () {
      pan(directions.DOWN);
    });

    $("#move-left").dblclick(preventDefault);
    $("#move-right").dblclick(preventDefault);
    $("#move-up").dblclick(preventDefault);
    $("#move-down").dblclick(preventDefault);
  }

  function preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function pan(direction) {
    switch (direction) {
      case directions.UP:
        orbitControls.panXY(0, panSpeed);
        break;
      case directions.DOWN:
        orbitControls.panXY(0, -panSpeed);
        break;
      case directions.LEFT:
        orbitControls.panXY(panSpeed, 0);
        break;
      case directions.RIGHT:
        orbitControls.panXY(-panSpeed, 0);
        break;
    }
  }

  function zoomIn(e) {
    e.preventDefault();
    orbitControls.dollyIn(1.1);
    orbitControls.update();
  }

  function zoomOut(e) {
    e.preventDefault;
    orbitControls.dollyOut(1.1);
    orbitControls.update();
  }

  init();
};

/*
 * Context menu for selected item
 */

var ContextMenu = function (blueprint3d) {
  var scope = this;
  var selectedItem;
  var three = blueprint3d.three;

  function init() {
    $("#context-menu-delete").click(function (event) {
      selectedItem.remove();
    });

    three.itemSelectedCallbacks.add(itemSelected);
    three.itemUnselectedCallbacks.add(itemUnselected);

    initResize();
    initChangeColor();

    $("#fixed").click(function () {
      var checked = $(this).prop("checked");
      selectedItem.setFixed(checked);
    });
  }

  function cmToIn(cm) {
    return cm / 2.54;
  }

  function inToCm(inches) {
    return inches * 2.54;
  }

  function itemSelected(item) {
    selectedItem = item;
    $("#context-menu-name").text(item.metadata.itemName);

    $("#item-width").val(cmToIn(selectedItem.getWidth()).toFixed(0));
    $("#item-height").val(cmToIn(selectedItem.getHeight()).toFixed(0));
    $("#item-depth").val(cmToIn(selectedItem.getDepth()).toFixed(0));

    $("#context-menu").show();

    $("#fixed").prop("checked", item.fixed);
  }

  function resize() {
    selectedItem.resize(
      inToCm($("#item-height").val()),
      inToCm($("#item-width").val()),
      inToCm($("#item-depth").val())
    );
  }

  function changeColor() {
    var selectedColor = $(this).val();
    $("#color-display").text(selectedColor);
    selectedItem.setColor(selectedColor);
  }

  function initResize() {
    $("#item-height").change(resize);
    $("#item-width").change(resize);
    $("#item-depth").change(resize);
  }

  function initChangeColor() {
    $("#color-selector").on("input", changeColor);
  }

  function itemUnselected() {
    selectedItem = null;
    $("#context-menu").hide();
  }

  init();
};

/*
 * Loading modal for items
 */

var ModalEffects = function (blueprint3d) {
  var scope = this;
  var blueprint3d = blueprint3d;
  var itemsLoading = 0;

  this.setActiveItem = function (active) {
    itemSelected = active;
    update();
  };

  function update() {
    if (itemsLoading > 0) {
      $("#loading-modal").show();
    } else {
      $("#loading-modal").hide();
    }
  }

  function init() {
    blueprint3d.model.scene.itemLoadingCallbacks.add(function () {
      itemsLoading += 1;
      update();
    });

    blueprint3d.model.scene.itemLoadedCallbacks.add(function () {
      itemsLoading -= 1;
      update();
    });

    update();
  }

  init();
};

/*
 * Side menu
 */

var SideMenu = function (blueprint3d, floorplanControls, modalEffects) {
  var blueprint3d = blueprint3d;
  var floorplanControls = floorplanControls;
  var modalEffects = modalEffects;

  var ACTIVE_CLASS = "active";

  var tabs = {
    FLOORPLAN: $("#floorplan_tab"),
    SHOP: $("#items_tab"),
    DESIGN: $("#design_tab"),
  };

  var scope = this;
  this.stateChangeCallbacks = $.Callbacks();

  this.states = {
    DEFAULT: {
      div: $("#viewer"),
      tab: tabs.DESIGN,
    },
    FLOORPLAN: {
      div: $("#floorplanner"),
      tab: tabs.FLOORPLAN,
    },
    SHOP: {
      div: $("#add-items"),
      tab: tabs.SHOP,
    },
  };

  // sidebar state
  var currentState = scope.states.FLOORPLAN;

  function init() {
    for (var tab in tabs) {
      var elem = tabs[tab];
      elem.click(tabClicked(elem));
    }

    $("#update-floorplan").click(floorplanUpdate);

    initLeftMenu();

    blueprint3d.three.updateWindowSize();
    handleWindowResize();

    initItems();

    setCurrentState(scope.states.DEFAULT);
  }

  function floorplanUpdate() {
    setCurrentState(scope.states.DEFAULT);
  }

  function tabClicked(tab) {
    return function () {
      // Stop three from spinning
      blueprint3d.three.stopSpin();

      // Selected a new tab
      for (var key in scope.states) {
        var state = scope.states[key];
        if (state.tab == tab) {
          setCurrentState(state);
          break;
        }
      }
    };
  }

  function setCurrentState(newState) {
    if (currentState == newState) {
      return;
    }

    // show the right tab as active
    if (currentState.tab !== newState.tab) {
      if (currentState.tab != null) {
        currentState.tab.removeClass(ACTIVE_CLASS);
      }
      if (newState.tab != null) {
        newState.tab.addClass(ACTIVE_CLASS);
      }
    }

    // set item unselected
    blueprint3d.three.getController().setSelectedObject(null);

    // show and hide the right divs
    currentState.div.hide();
    newState.div.show();

    // custom actions
    if (newState == scope.states.FLOORPLAN) {
      floorplanControls.updateFloorplanView();
      floorplanControls.handleWindowResize();
    }

    if (currentState == scope.states.FLOORPLAN) {
      blueprint3d.model.floorplan.update();
    }

    if (newState == scope.states.DEFAULT) {
      blueprint3d.three.updateWindowSize();
    }

    // set new state
    handleWindowResize();
    currentState = newState;

    scope.stateChangeCallbacks.fire(newState);
  }

  function initLeftMenu() {
    $(window).resize(handleWindowResize);
    handleWindowResize();
  }

  function handleWindowResize() {
    $(".sidebar").height(window.innerHeight);
    $("#add-items").height(window.innerHeight);
  }

  // TODO: this doesn't really belong here
  function initItems() {
    $("#add-items").mousedown(function (e) {
      let $target = $(e.target);

      var metadata = {
        itemName: $target.attr("model-name"),
        resizable: true,
        modelUrl: $target.attr("model-url"),
        itemType: parseInt($target.attr("model-type")),
      };

      console.log(metadata, "metadatametadatametadata");

      blueprint3d.model.scene.addItem(
        metadata.itemType,
        metadata.modelUrl,
        metadata
      );
      setCurrentState(scope.states.DEFAULT);
    });

    //   $("#add-items")
    //     .find(".add-item")
    //     .mousedown(function (e) {
    //       var modelUrl = $(this).attr("model-url");
    //       var itemType = parseInt($(this).attr("model-type"));
    //       console.log("ASSSSSSSSSSSss");
    //       var metadata = {
    //         itemName: $(this).attr("model-name"),
    //         resizable: true,
    //         modelUrl: modelUrl,
    //         itemType: itemType,
    //       };

    //       blueprint3d.model.scene.addItem(itemType, modelUrl, metadata);
    //       setCurrentState(scope.states.DEFAULT);
    //     });
  }

  init();
};

/*
 * Change floor and wall textures
 */

var TextureSelector = function (blueprint3d, sideMenu) {
  var scope = this;
  var three = blueprint3d.three;
  var isAdmin = isAdmin;

  var currentTarget = null;

  function initTextureSelectors() {
    $(".texture-select-thumbnail").click(function (e) {
      var textureUrl = $(this).attr("texture-url");
      var textureStretch = $(this).attr("texture-stretch") == "true";
      var textureScale = parseInt($(this).attr("texture-scale"));
      currentTarget.setTexture(textureUrl, textureStretch, textureScale);

      e.preventDefault();
    });
  }

  function init() {
    three.wallClicked.add(wallClicked);
    three.floorClicked.add(floorClicked);
    three.itemSelectedCallbacks.add(reset);
    three.nothingClicked.add(reset);
    sideMenu.stateChangeCallbacks.add(reset);
    initTextureSelectors();
  }

  function wallClicked(halfEdge) {
    currentTarget = halfEdge;
    $("#floorTexturesDiv").hide();
    $("#wallTextures").show();
  }

  function floorClicked(room) {
    currentTarget = room;
    $("#wallTextures").hide();
    $("#floorTexturesDiv").show();
  }

  function reset() {
    $("#wallTextures").hide();
    $("#floorTexturesDiv").hide();
  }

  init();
};

/*
 * Floorplanner controls
 */

var ViewerFloorplanner = function (blueprint3d) {
  var canvasWrapper = "#floorplanner";

  // buttons
  var move = "#move";
  var remove = "#delete";
  var draw = "#draw";

  var activeStlye = "btn-primary disabled";

  this.floorplanner = blueprint3d.floorplanner;

  var scope = this;

  function init() {
    $(window).resize(scope.handleWindowResize);
    scope.handleWindowResize();

    // mode buttons
    scope.floorplanner.modeResetCallbacks.add(function (mode) {
      $(draw).removeClass(activeStlye);
      $(remove).removeClass(activeStlye);
      $(move).removeClass(activeStlye);
      if (mode == BP3D.Floorplanner.floorplannerModes.MOVE) {
        $(move).addClass(activeStlye);
      } else if (mode == BP3D.Floorplanner.floorplannerModes.DRAW) {
        $(draw).addClass(activeStlye);
      } else if (mode == BP3D.Floorplanner.floorplannerModes.DELETE) {
        $(remove).addClass(activeStlye);
      }

      if (mode == BP3D.Floorplanner.floorplannerModes.DRAW) {
        $("#draw-walls-hint").show();
        scope.handleWindowResize();
      } else {
        $("#draw-walls-hint").hide();
      }
    });

    $(move).click(function () {
      scope.floorplanner.setMode(BP3D.Floorplanner.floorplannerModes.MOVE);
    });

    $(draw).click(function () {
      scope.floorplanner.setMode(BP3D.Floorplanner.floorplannerModes.DRAW);
    });

    $(remove).click(function () {
      scope.floorplanner.setMode(BP3D.Floorplanner.floorplannerModes.DELETE);
    });
  }

  this.updateFloorplanView = function () {
    scope.floorplanner.reset();
  };

  this.handleWindowResize = function () {
    $(canvasWrapper).height(window.innerHeight - $(canvasWrapper).offset().top);
    scope.floorplanner.resizeView();
  };

  init();
};

var mainControls = function (blueprint3d, eventBus) {
  var blueprint3d = blueprint3d;

  function newDesign() {
    blueprint3d.model.loadSerialized(
      '{"floorplan":{"corners":{"f90da5e3-9e0e-eba7-173d-eb0b071e838e":{"x":204.85099999999989,"y":289.052},"da026c08-d76a-a944-8e7b-096b752da9ed":{"x":672.2109999999999,"y":289.052},"4e3d65cb-54c0-0681-28bf-bddcc7bdb571":{"x":672.2109999999999,"y":-178.308},"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2":{"x":204.85099999999989,"y":-178.308}},"walls":[{"corner1":"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2","corner2":"f90da5e3-9e0e-eba7-173d-eb0b071e838e","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"f90da5e3-9e0e-eba7-173d-eb0b071e838e","corner2":"da026c08-d76a-a944-8e7b-096b752da9ed","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"da026c08-d76a-a944-8e7b-096b752da9ed","corner2":"4e3d65cb-54c0-0681-28bf-bddcc7bdb571","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"4e3d65cb-54c0-0681-28bf-bddcc7bdb571","corner2":"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}}],"wallTextures":[],"floorTextures":{},"newFloorTextures":{}},"items":[]}'
    );
  }

  function loadDesign() {
    files = $("#loadFile").get(0).files;
    var reader = new FileReader();
    reader.onload = function (event) {
      var data = event.target.result;
      console.log(data, "datadatadatadatadata");

      blueprint3d.model.loadSerialized(data);
    };
    reader.readAsText(files[0]);
  }

  function loadDesignV2() {
    eventBus.emit(ACTION.LOAD_DESIGN);
  }

  function saveDesign() {
    var data = blueprint3d.model.exportSerialized();
    var a = window.document.createElement("a");
    var blob = new Blob([data], { type: "text" });
    a.href = window.URL.createObjectURL(blob);
    a.download = "design.blueprint3d";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function saveToDB() {
    let dataURL = blueprint3d.three.dataUrl();
    const tempImage = new Image();
    tempImage.src = dataURL;

    const cropCanvas = document.createElement("canvas");
    cropCanvas.width = 800;
    cropCanvas.height = 800;
    const ctx = cropCanvas.getContext("2d");

    tempImage.onload = function () {
      const centerX = (tempImage.width - cropCanvas.width) / 2;
      const centerY = (tempImage.height - cropCanvas.height) / 2;
      ctx.drawImage(
        tempImage,
        centerX,
        centerY,
        cropCanvas.width,
        cropCanvas.height,
        0,
        0,
        cropCanvas.width,
        cropCanvas.height
      );
      const centerAreaDataURL = cropCanvas.toDataURL();
      var data = blueprint3d.model.exportSerialized();
      eventBus.emit(ACTION.SAVE_DESIGN, { data, thumbnail: centerAreaDataURL });
    };
  }

  function returnPrevious() {
    eventBus.emit("RETURN_PREVIOUS");
  }

  function init() {
    $("#new").click(newDesign);
    $("#loadFile").change(loadDesign);
    $("#loadDesign").click(loadDesignV2);
    $("#saveDesign").click(saveToDB);
    $("#saveFile").click(saveDesign);
    $("#return").click(returnPrevious);
    $("#return").click(returnPrevious);
  }

  init();
};

var handlerActionFromParent = function (blueprint3d, eventBus, template) {
  function loadDesign(file) {
    console.log("ON ", ACTION_FROM_PARENT.LOAD_DESIGN_FROM_PARENT, file.data);
    blueprint3d.model.loadSerialized(file.data);
  }

  function initFrame(data) {
    console.log("ON ", ACTION_FROM_PARENT.INIT_FRAME, data);
    const $templateSelect = $("#templateSelect");

    $templateSelect.on("change", function () {
      const selectedValue = $(this).val();
      const selectedTemplate = data.find((t) => t.id === selectedValue);

      let templateStr = selectedTemplate.metadata || "[]";
      const models = JSON.parse(templateStr);
      var itemsDiv = $("#items-wrapper");
      itemsDiv.empty();
      for (var i = 0; i < models.length; i++) {
        var item = models[i];
        const itemStatic = StaticModelItems.find(
          (staticItem) => staticItem.id === item.id
        );

        var html = `
        <div class="col-sm-4">
            <a class="thumbnail add-item" model-name=${itemStatic.name}
            model-url=${itemStatic.model}
           model-type=${itemStatic.type}
            >
              <img src="${item.image}"
              model-name=${itemStatic.name}
            model-url=${itemStatic.model}
           model-type=${itemStatic.type}
              >
            </a>
        </div>
        `;
        itemsDiv.append(html);
      }

      // $("#add-items > a")
      //   .find(".add-item")
      //   .mousedown(function (e) {
      //     var modelUrl = $(this).attr("model-url");
      //     var itemType = parseInt($(this).attr("model-type"));
      //     console.log("ASSSSSSSSSSSss");
      //     var metadata = {
      //       itemName: $(this).attr("model-name"),
      //       resizable: true,
      //       modelUrl: modelUrl,
      //       itemType: itemType,
      //     };

      //     blueprint3d.model.scene.addItem(itemType, modelUrl, metadata);
      //     setCurrentState(scope.states.DEFAULT);
      //   });
    });

    const defaultTemplate = data[0].id;

    data.forEach((template) => {
      $templateSelect.append(
        $("<option>", {
          value: template.id,
          text: template.name,
        })
      );
    });

    $templateSelect.val(defaultTemplate);
    $templateSelect.trigger("change");
  }

  eventBus.on(ACTION_FROM_PARENT.LOAD_DESIGN_FROM_PARENT, (data) => {
    loadDesign(data.data);
  });

  eventBus.on(ACTION_FROM_PARENT.INIT_FRAME, (data) => {
    initFrame(data.templates);
  });
};
/*
 * Initialize!
 */

$(document).ready(function () {
  // main setup
  var opts = {
    floorplannerElement: "floorplanner-canvas",
    threeElement: "#viewer",
    threeCanvasElement: "three-canvas",
    textureDir: "models/textures/",
    widget: false,
  };
  var blueprint3d = new BP3D.Blueprint3d(opts);

  var modalEffects = new ModalEffects(blueprint3d);
  var viewerFloorplanner = new ViewerFloorplanner(blueprint3d);
  var contextMenu = new ContextMenu(blueprint3d);
  var sideMenu = new SideMenu(blueprint3d, viewerFloorplanner, modalEffects);
  var textureSelector = new TextureSelector(blueprint3d, sideMenu);
  var cameraButtons = new CameraButtons(blueprint3d);
  let template = new Template();

  handlerActionFromParent(blueprint3d, window.eventBus, template);
  mainControls(blueprint3d, window.eventBus);

  // This serialization format needs work
  // Load a simple rectangle room
  blueprint3d.model.loadSerialized(
    '{"floorplan":{"corners":{"f90da5e3-9e0e-eba7-173d-eb0b071e838e":{"x":204.85099999999989,"y":289.052},"da026c08-d76a-a944-8e7b-096b752da9ed":{"x":672.2109999999999,"y":289.052},"4e3d65cb-54c0-0681-28bf-bddcc7bdb571":{"x":672.2109999999999,"y":-178.308},"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2":{"x":204.85099999999989,"y":-178.308}},"walls":[{"corner1":"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2","corner2":"f90da5e3-9e0e-eba7-173d-eb0b071e838e","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"f90da5e3-9e0e-eba7-173d-eb0b071e838e","corner2":"da026c08-d76a-a944-8e7b-096b752da9ed","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"da026c08-d76a-a944-8e7b-096b752da9ed","corner2":"4e3d65cb-54c0-0681-28bf-bddcc7bdb571","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"4e3d65cb-54c0-0681-28bf-bddcc7bdb571","corner2":"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}}],"wallTextures":[],"floorTextures":{},"newFloorTextures":{}},"items":[]}'
  );
});
