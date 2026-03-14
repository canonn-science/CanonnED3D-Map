
var System = {

  'particle': null,
  'particleGeo': null,
  'particleColor': [],
  'particleInfos': [],
  'count': 0,
  'scaleSize': 64,

  /**
   * Add a system in galaxy
   *
   * @param  {object} val        System properties (x, y, z, name are mandatory)
   * @param  {string} withSolid  Add a solid sphere (default: false)
   */

  'create': function (val, withSolid) {

    if (withSolid == undefined) withSolid = false;

    if (val.coords == undefined) return false;

    var x = parseFloat(val.coords.x);
    var y = parseFloat(val.coords.y);
    var z = -parseFloat(val.coords.z); //-- Revert Z coord

    //--------------------------------------------------------------------------
    //-- Particle for near and far view

    var colors = [];
    if (this.particleGeo !== null) {

      //-- If system with info already registered, concat datas
      var idSys = x + '_' + y + '_' + z;
      if (val.infos != undefined && this.particleInfos[idSys]) {
        var indexParticle = this.particleInfos[idSys];
        this.particleGeo.vertices[indexParticle].infos += val.infos;
        if (val.cat != undefined) Ed3d.addObjToCategories(indexParticle, val.cat);
        return;
      }

      var particle = new THREE.Vector3(x, y, z);

      //-- Get point color

      if (val.cat != undefined && val.cat[0] != undefined && Ed3d.colors[val.cat[0]] != undefined) {
        this.particleColor[this.count] = Ed3d.colors[val.cat[0]];
      } else {
        this.particleColor[this.count] = new THREE.Color(Ed3d.systemColor);
      }

      //-- If system got some categories, add it to cat list and save his main color

      if (val.cat != undefined) {
        Ed3d.addObjToCategories(this.count, val.cat);
        particle.color = this.particleColor[this.count];
      }

      //-- Attach name and set point as clickable

      particle.clickable = true;
      particle.visible = true;
      particle.name = val.name;
      if (val.infos != undefined) {
        particle.infos = val.infos;
        this.particleInfos[idSys] = this.count;
      }
      if (val.url != undefined) {
        particle.url = val.url;
      }

      this.particleGeo.vertices.push(particle);

      this.count++;
    }

    //--------------------------------------------------------------------------
    //-- Check if we have to add coords for a route

    if (Route.active == true) {

      if (Route.systems[val.name] != undefined) {
        Route.systems[val.name] = [x, y, z]
      }

    }

    //--------------------------------------------------------------------------
    //-- Build a sphere if needed

    if (withSolid) {

      //-- Add glow sprite from first cat color if defined, else take white glow

      var mat = Ed3d.material.glow_1;

      var sprite = new THREE.Sprite(mat);
      sprite.position.set(x, y, z);
      sprite.scale.set(50, 50, 1.0);
      scene.add(sprite); // this centers the glow at the mesh

      //-- Sphere

      var geometry = new THREE.SphereGeometry(2, 10, 10);

      var sphere = new THREE.Mesh(geometry, Ed3d.material.white);

      sphere.position.set(x, y, z);

      sphere.name = val.name;

      sphere.clickable = true;
      sphere.idsprite = sprite.id;
      scene.add(sphere);

      return sphere;
    }

  },


  /**
   * Init the galaxy particle geometry
   */

  'initParticleSystem': function () {
    this.particleGeo = new THREE.Geometry;
  },

  /**
   * Create (or rebuild) the particle system.
   * Safe to call after every streaming batch: the previous Points object is
   * removed from the scene before a new one is constructed from the
   * accumulated geometry, so incoming systems appear incrementally.
   */

  'endParticleSystem': function () {

    if (this.particleGeo == null) {
      return;
    }

    //-- Remove the previous particle cloud before replacing it.
    if (this.particle != null) {
      scene.remove(this.particle);
    }

    //-- Wrap the accumulated vertex/color arrays in a brand-new Geometry
    //   object on every flush.  Three.js r75 keys its internal GPU buffer
    //   size to the geometry object's id; reusing the same geometry object
    //   causes it to silently ignore all vertices beyond the first-upload
    //   count.  A new wrapper object forces a correctly-sized GPU allocation
    //   on each batch while still sharing the same underlying JS arrays
    //   (no copying overhead).
    var freshGeo = new THREE.Geometry();
    freshGeo.vertices = this.particleGeo.vertices;
    freshGeo.colors = this.particleColor;

    var particleMaterial = new THREE.PointsMaterial({
      map: Ed3d.textures.flare_yellow,
      vertexColors: THREE.VertexColors,
      size: this.scaleSize,
      fog: false,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthTest: true,
      depthWrite: false
    });

    this.particle = new THREE.Points(freshGeo, particleMaterial);

    this.particle.sortParticles = true;
    this.particle.clickable = true;

    scene.add(this.particle);

    //-- Swap the accumulator to the fresh geometry so that future create()
    //   calls push into the same arrays that the live Points object holds.
    this.particleGeo = freshGeo;
  },


  /**
   * Remove systems list
   */

  'remove': function () {

    this.particleColor = [];
    this.particleGeo = null;
    this.count = 0;
    scene.remove(this.particle);

  },

  /**
   * Load Spectral system color
   */

  'loadSpectral': function (val) {

  }

}
