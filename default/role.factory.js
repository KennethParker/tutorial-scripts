/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.factory');
 * mod.thing == 'a thing'; // true
 */

var creepType = {
    init: function(parts, name, level)
    {
        this.parts = parts;
        this.name = name;
        this.level = level;
    },
    parts : [],
    name : 'name',
    level : 1
};


module.exports = { 
    spawnCreep : function() {
    // TODO calculate
    var countHarvester = 1;
    var countBuilder = 1;
    var countUpgrader = 1;

    for (var e in Game.spawns) {
        var spawn = Game.spawns[e];
        var spawnType = parseInt(Memory.created) % 3;
        if (!spawn.spawning && (spawn.energy / spawn.energyCapacity > .51)) {
            console.log("Spawning: " + spawnType);
            var creepType = Memory.creepDesigns[spawnType];
            console.log(creepType.name);
            spawn.spawnCreep(creepType.parts, creepType.name + Memory.created, {memory :{role: creepType.name}});
            
            Memory.created = Memory.created + 1;

        }
    }},
    init: function() {

    if (Memory.factoryInit != undefined || Memory.factoryInit == true) {
        return;
    }
    Memory.factoryInit = true;
    Memory.spawnQ = [];
    Memory.creepDesigns = [{parts: [CARRY, WORK, MOVE], name: 'upgrader', level: 1},
    {parts: [CARRY, WORK, MOVE], name: 'harvester', level: 1},
    {parts: [CARRY, WORK, MOVE], name: 'builder', level: 1}];
    Memory.created = 0;

}
};


