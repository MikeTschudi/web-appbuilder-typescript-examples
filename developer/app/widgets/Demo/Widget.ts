/// <amd-dependency path="jimu/BaseWidget" name="BaseWidget" />
declare var BaseWidget: any;
// additional jimu imports (using the 2 lines of syntax above) go here.
import FeatureLayer = require("esri/layers/FeatureLayer");
import Query = require("esri/tasks/support/Query");
import SceneView = require("esri/views/SceneView");
// additional esri imports (using require syntax like the above line) go here.
import * as dojoDeclare from "dojo/_base/declare";
import * as on from "dojo/on";
// import * as Query from 'esri/tasks/support/Query';
// additional normal modules (dojo, local, etc) go here
interface IDemoWidget {
    postCreate(): void;
    createLayer(): void;
    queryLayer(layer: FeatureLayer): void;
    baseClass: string;
    sceneView: SceneView;
}

let myClass: any =  dojoDeclare<IDemoWidget>([BaseWidget], {
  baseClass: "demo-widget",

  sceneView: null,

  postCreate(): void {
    this.inherited(arguments);
    this.widgetWrapper.innerHTML = this.config.demoSetting;
    this.createLayer();
  },

  /**
   * Example of adding a layer to the map, and querying the features.
   */
  createLayer(this: IDemoWidget): void {
    const layer: FeatureLayer = new FeatureLayer({
      url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Recreation/FeatureServer/0"
    });
    layer.then((evt) => {
      this.queryLayer(layer);
    });
    // const sceneView:SceneView  = this.sceneView;
    this.sceneView.map.layers.add(layer);
  },

  queryLayer(this: IDemoWidget, layer: FeatureLayer): void {
    const query: Query = new Query();
    query.where = "facility = 7";
    query.outFields = ["*"];
    console.log("here0", layer, query);
    layer.queryFeatures(query).then((results) => {
      console.log("query resultsssss:", results.features);
    });
  }
});

export = myClass;