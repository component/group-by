
var groupBy = require('..');

var log1 = { type: 'log', version: '1.0.0' };
var log2 = { type: 'log', version: '1.1.0' };
var log3 = { type: 'log', version: '1.3.0' };

var app1 = { type: 'app', version: '1.0.0' };
var app2 = { type: 'app', version: '1.1.0' };

var nodes = [log1, app1, log2, log3, app2];

describe('groupBy(arr, prop)', function(){
  it('should group by a property', function(){
    var ret = groupBy(nodes, 'type');
    ret.log.should.have.length(3);
    ret.app.should.have.length(2);
  })
})

describe('groupBy(arr, prop1, prop2)', function(){
  it('should group by multiple properties', function () {
    var ret = groupBy(nodes, 'type', 'version');
    Object.keys(ret.log).should.have.length(3);
    ret.log['1.0.0'].should.have.length(1);
    ret.app['1.1.0'].should.have.length(1);
  })
})

describe('groupBy(arr, [prop1, prop2])', function(){
  it('should group by multiple properties', function () {
    var ret = groupBy(nodes, ['type', 'version']);
    Object.keys(ret.log).should.have.length(3);
    ret.log['1.0.0'].should.have.length(1);
    ret.app['1.1.0'].should.have.length(1);
  })
})

describe('groupBy(arr, fn)', function(){
  it('should group by the returned property', function(){
    var ret = groupBy(nodes, function(node){
      return node.version;
    });

    ret['1.0.0'].should.have.length(2);
    ret['1.1.0'].should.have.length(2);
    ret['1.3.0'].should.have.length(1);
  })
})

describe('groupBy(arr, fn1, fn2)', function(){
  it('should group by the returned properties', function () {
    var ret = groupBy(nodes, function(node){
      return node.type;
    }, function(node){
      return node.version;
    });
    Object.keys(ret.log).should.have.length(3);
    ret.log['1.0.0'].should.have.length(1);
    ret.app['1.1.0'].should.have.length(1);
  })
})

describe('groupBy(arr, [fn1, fn2])', function(){
  it('should group by the returned properties', function () {
    var ret = groupBy(nodes, function(node){
      return node.type;
    }, function(node){
      return node.version;
    });
    Object.keys(ret.log).should.have.length(3);
    ret.log['1.0.0'].should.have.length(1);
    ret.app['1.1.0'].should.have.length(1);
  })
})

