document.addEventListener("WebComponentsReady", function() {
  runTests();
});

function runTests(){
  suite('px-vis-behavior-chart does Polymer exist?', function() {
    test('Polymer exists', function() {
      assert.isTrue(Polymer !== null);
    });
  });

  suite('creates our multi scale', function() {
    var multiScale = document.getElementById('scale');

    suiteSetup(function(done) {
      var width = 800,
          height = 500,
          margin = {
            "top": 10,
            "right": 5,
            "bottom": 20,
            "left": 15
          },
          axes = ["y","y1","y2"],
          chartData = [
            {
              "x": 1397102460000,
              "y": 0,
              "y1": 23,
              "y2": 26
            },{
              "x": 1397131620000,
              "y": 6,
              "y1": 16,
              "y2": 32
            },{
              "x": 1397160780000,
              "y": 10,
              "y1": 11,
              "y2": 20
            },{
              "x": 1397189940000,
              "y": 4,
              "y1": 12,
              "y2": 22
            },{
              "x": 1397219100000,
              "y": 6,
              "y1": 19,
              "y2": 30
            }
          ];

      multiScale.set('width', width);
      multiScale.set('height', height);
      multiScale.set('margin', margin);
      multiScale.set('chartData', chartData);
      multiScale.set('axes', axes);
      multiScale.set('dimensions', axes);
      multiScale.set('commonAxis', false);


      // fake observers
      multiScale.addEventListener('data-extents-changed', function() {
        multiScale._setDomain();
      });
      multiScale.addEventListener('px-vis-multi-domain-changed-updated', function() {
        done();
      });
      multiScale._setXScale(width,margin);
      multiScale._setYScale(height,margin,axes);
      multiScale._generateDataExtents();
    });

    test('multiScale fixture is created', function() {
      assert.isTrue(multiScale !== null);
    });


    test('multiScale creates an x', function() {
      assert.isDefined(multiScale.x);
    });

    test('multiScale creates an y', function() {
      assert.isDefined(multiScale.y);
    });

    test('multiScale x returns correct value "y"', function() {
      assert.equal( multiScale.x("y"), 130);
    });

    test('multiScale x returns correct value "y1"', function() {
      assert.equal( multiScale.x("y1"), 390);
    });

    test('multiScale x returns correct value "y2"', function() {
      assert.equal( multiScale.x("y2"), 650);
    });


    test('multiScale y returns correct value 0', function() {
      assert.equal( multiScale.y["y"](0), 470);
    });

    test('multiScale y returns correct value 10', function() {
      assert.equal( multiScale.y["y"](10), 0);
    });

    test('multiScale y returns correct value 5', function() {
      assert.equal( multiScale.y["y"](5), 235);
    });


    test('multiScale y1 returns correct value 0', function() {
      assert.equal( multiScale.y["y1"](11), 470);
    });

    test('multiScale y1 returns correct value 10', function() {
      assert.equal( multiScale.y["y1"](23), 0);
    });

    test('multiScale y1 returns correct value 5', function() {
      assert.equal( multiScale.y["y1"](17), 235);
    });


    test('multiScale y2 returns correct value 0', function() {
      assert.equal( multiScale.y["y2"](20), 470);
    });

    test('multiScale y2 returns correct value 10', function() {
      assert.equal( multiScale.y["y2"](32), 0);
    });

    test('multiScale y2 returns correct value 5', function() {
      assert.equal( multiScale.y["y2"](26), 235);
    });
  }); //suite

  suite('zooming works with our multi scale', function() {
    var multiScale = document.getElementById('scale'),
        axesDomain =

    suiteSetup(function(done) {
      '_updateDomain(axesDomain.*)',
    });
      test('multiScale y2 returns correct value 5', function() {
      assert.equal( multiScale.y["y2"](26), 235);
    });
  });

  suite('dataExtents generated properly without commonAxis', function() {
    var scale = document.getElementById('scale');


    suiteSetup(function() {

      var dimensions = ['axis1', 'axis2', 'axis3', 'axis4'],
          chartData = [ {axis1: 1, axis2: 6, axis3: 11, axis4: 16},
                    {axis1: 2, axis2: 7, axis3: 12, axis4: 17},
                    {axis1: 3, axis2: 8, axis3: 13, axis4: 18},
                    {axis1: 4, axis2: 9, axis3: 14, axis4: 19},
                    {axis1: 5, axis2: 10, axis3: 15, axis4: 20}],
          chartExtents = {axis1: ['dynamic', 'dynamic'], axis2: ['dynamic', 20], axis3: [0, 'dynamic']};

      scale.set('chartData', chartData);
      scale.set('dimensions', dimensions);
      scale.set('chartExtents', chartExtents);
      scale.set('commonAxis', false);

      //fake a call from an external observer
      scale._generateDataExtents();
    });

    test('dataExtents for dynamic/dynamic', function() {
      assert.equal(scale.dataExtents.y['axis1'][0], 1);
      assert.equal(scale.dataExtents.y['axis1'][1], 5);
    });

    test('dataExtents for dynamic/set', function() {
      assert.equal(scale.dataExtents.y['axis2'][0], 6);
      assert.equal(scale.dataExtents.y['axis2'][1], 20);
    });

    test('dataExtents for set/dynamic', function() {
      assert.equal(scale.dataExtents.y['axis3'][0], 0);
      assert.equal(scale.dataExtents.y['axis3'][1], 15);
    });

    test('dataExtents for missing dimension', function() {
      assert.equal(scale.dataExtents.y['axis4'][0], 16);
      assert.equal(scale.dataExtents.y['axis4'][1], 20);
    });
  });

  suite('dataExtents generated properly with commonAxis and the axis with the max val is not defined in chartExtents', function() {
    var scale = document.getElementById('scale');


    suiteSetup(function() {

      var dimensions = ['axis1', 'axis2', 'axis3', 'axis4'],
          chartData = [ {axis1: 1, axis2: 6, axis3: 11, axis4: 16},
                    {axis1: 2, axis2: 7, axis3: 12, axis4: 17},
                    {axis1: 3, axis2: 8, axis3: 13, axis4: 18},
                    {axis1: 4, axis2: 9, axis3: 14, axis4: 19},
                    {axis1: 5, axis2: 10, axis3: 15, axis4: 20}],
          chartExtents = {axis1: ['dynamic', 'dynamic'], axis2: ['dynamic', 20], axis3: [5, 'dynamic']};

      scale.set('chartData', chartData);
      scale.set('dimensions', dimensions);
      scale.set('chartExtents', chartExtents);
      scale.set('commonAxis', true);

      //fake a call from an external observer
      scale._generateDataExtents();
    });

    test('dataExtents for dynamic/dynamic', function() {
      assert.equal(scale.dataExtents.y['axis1'][0], 1);
      assert.equal(scale.dataExtents.y['axis1'][1], 20);
    });

    test('dataExtents for dynamic/set', function() {
      assert.equal(scale.dataExtents.y['axis2'][0], 1);
      assert.equal(scale.dataExtents.y['axis2'][1], 20);
    });

    test('dataExtents for set/dynamic', function() {
      assert.equal(scale.dataExtents.y['axis3'][0], 1);
      assert.equal(scale.dataExtents.y['axis3'][1], 20);
    });

    test('dataExtents for missing dimension', function() {
      assert.equal(scale.dataExtents.y['axis4'][0], 1);
      assert.equal(scale.dataExtents.y['axis4'][1], 20);
    });
  });

  suite('dataExtents generated properly with commonAxis and the axis with the max val is defined in chartExtents', function() {
    var scale = document.getElementById('scale');


    suiteSetup(function() {

      var dimensions = ['axis1', 'axis2', 'axis3', 'axis4'],
          chartData = [ {axis1: -1, axis2: 6, axis3: 11, axis4: 16},
                    {axis1: 2, axis2: 7, axis3: 12, axis4: 17},
                    {axis1: 3, axis2: 8, axis3: 33, axis4: 18},
                    {axis1: 4, axis2: 9, axis3: 14, axis4: 19},
                    {axis1: 5, axis2: 10, axis3: 15, axis4: 20}],
          chartExtents = {axis1: ['dynamic', 'dynamic'], axis2: ['dynamic', 20], axis3: [0, 'dynamic']};

      scale.set('chartData', chartData);
      scale.set('dimensions', dimensions);
      scale.set('chartExtents', chartExtents);
      scale.set('commonAxis', true);

      //fake a call from an external observer
      scale._generateDataExtents();
    });

    test('dataExtents for dynamic/dynamic', function() {
      assert.equal(scale.dataExtents.y['axis1'][0], -1);
      assert.equal(scale.dataExtents.y['axis1'][1], 33);
    });

    test('dataExtents for dynamic/set', function() {
      assert.equal(scale.dataExtents.y['axis2'][0], -1);
      assert.equal(scale.dataExtents.y['axis2'][1], 33);
    });

    test('dataExtents for set/dynamic', function() {
      assert.equal(scale.dataExtents.y['axis3'][0], -1);
      assert.equal(scale.dataExtents.y['axis3'][1], 33);
    });

    test('dataExtents for missing dimension', function() {
      assert.equal(scale.dataExtents.y['axis4'][0], -1);
      assert.equal(scale.dataExtents.y['axis4'][1], 33);
    });
  });

  suite('dataExtents generated properly with commonAxis and the max val is defined in chartExtents', function() {
    var scale = document.getElementById('scale');


    suiteSetup(function() {

      var dimensions = ['axis1', 'axis2', 'axis3', 'axis4'],
          chartData = [ {axis1: -1, axis2: 6, axis3: 11, axis4: 16},
                    {axis1: 2, axis2: 7, axis3: 12, axis4: 17},
                    {axis1: 3, axis2: 8, axis3: 33, axis4: 18},
                    {axis1: 4, axis2: 9, axis3: 14, axis4: 19},
                    {axis1: 5, axis2: 10, axis3: 15, axis4: 20}],
          chartExtents = {axis1: ['dynamic', 'dynamic'], axis2: ['dynamic', 20], axis3: [0, 30]};

      scale.set('chartData', chartData);
      scale.set('dimensions', dimensions);
      scale.set('chartExtents', chartExtents);
      scale.set('commonAxis', true);

      //fake a call from an external observer
      scale._generateDataExtents();
    });

    test('dataExtents for dynamic/dynamic', function() {
      assert.equal(scale.dataExtents.y['axis1'][0], -1);
      assert.equal(scale.dataExtents.y['axis1'][1], 30);
    });

    test('dataExtents for dynamic/set', function() {
      assert.equal(scale.dataExtents.y['axis2'][0], -1);
      assert.equal(scale.dataExtents.y['axis2'][1], 30);
    });

    test('dataExtents for set/dynamic', function() {
      assert.equal(scale.dataExtents.y['axis3'][0], -1);
      assert.equal(scale.dataExtents.y['axis3'][1], 30);
    });

    test('dataExtents for missing dimension', function() {
      assert.equal(scale.dataExtents.y['axis4'][0], -1);
      assert.equal(scale.dataExtents.y['axis4'][1], 30);
    });
  });

  // suite('zooming updates the domain', function() {
  //   var multiScale = document.getElementById('scale');

  //   suiteSetup(function(done) {
  //     var width = 800,
  //         height = 500,
  //         margin = {
  //           "top": 10,
  //           "right": 5,
  //           "bottom": 20,
  //           "left": 15
  //         },
  //         axes = ["y","y1","y2"],
  //         chartData = [
  //           {
  //             "x": 1397102460000,
  //             "y": 0,
  //             "y1": 23,
  //             "y2": 26
  //           },{
  //             "x": 1397131620000,
  //             "y": 6,
  //             "y1": 16,
  //             "y2": 32
  //           },{
  //             "x": 1397160780000,
  //             "y": 10,
  //             "y1": 11,
  //             "y2": 20
  //           },{
  //             "x": 1397189940000,
  //             "y": 4,
  //             "y1": 12,
  //             "y2": 22
  //           },{
  //             "x": 1397219100000,
  //             "y": 6,
  //             "y1": 19,
  //             "y2": 30
  //           }
  //         ];

  //     multiScale.set('width', width);
  //     multiScale.set('height', height);
  //     multiScale.set('margin', margin);
  //     multiScale.set('chartData', chartData);
  //     multiScale.set('axes', axes);
  //     multiScale.set('dimensions', axes);
  //     multiScale.set('commonAxis', false);


  //     // fake observers
  //     multiScale.addEventListener('data-extents-changed', function() {
  //       multiScale._setDomain();
  //     });
  //     multiScale.addEventListener('px-vis-multi-domain-changed-updated', function() {
  //       done();
  //     });
  //     multiScale._setXScale(width,margin);
  //     multiScale._setYScale(height,margin,axes);
  //     multiScale._generateDataExtents();
  //   });

  //   test('multiScale fixture is created', function() {
  //     assert.isTrue(multiScale !== null);
  //   });


  //   test('multiScale creates an x', function() {
  //     assert.isDefined(multiScale.x);
  //   });

  //   test('multiScale creates an y', function() {
  //     assert.isDefined(multiScale.y);
  //   });

  //   test('multiScale x returns correct value "y"', function() {
  //     assert.equal( multiScale.x("y"), 130);
  //   });

  //   test('multiScale x returns correct value "y1"', function() {
  //     assert.equal( multiScale.x("y1"), 390);
  //   });

  //   test('multiScale x returns correct value "y2"', function() {
  //     assert.equal( multiScale.x("y2"), 650);
  //   });


  //   test('multiScale y returns correct value 0', function() {
  //     assert.equal( multiScale.y["y"](0), 470);
  //   });

  //   test('multiScale y returns correct value 10', function() {
  //     assert.equal( multiScale.y["y"](10), 0);
  //   });

  //   test('multiScale y returns correct value 5', function() {
  //     assert.equal( multiScale.y["y"](5), 235);
  //   });


  //   test('multiScale y1 returns correct value 0', function() {
  //     assert.equal( multiScale.y["y1"](11), 470);
  //   });

  //   test('multiScale y1 returns correct value 10', function() {
  //     assert.equal( multiScale.y["y1"](23), 0);
  //   });

  //   test('multiScale y1 returns correct value 5', function() {
  //     assert.equal( multiScale.y["y1"](17), 235);
  //   });


  //   test('multiScale y2 returns correct value 0', function() {
  //     assert.equal( multiScale.y["y2"](20), 470);
  //   });

  //   test('multiScale y2 returns correct value 10', function() {
  //     assert.equal( multiScale.y["y2"](32), 0);
  //   });

  //   test('multiScale y2 returns correct value 5', function() {
  //     assert.equal( multiScale.y["y2"](26), 235);
  //   });
  //
  // }); //suite

}