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
    console.log("Looking for spawn");
    console.log(Game.spawns);
    for (var e in Game.spawns) {
        var spawn = Game.spawns[e];
        var spawnType = 0;
        console.log("Spawn Found");
        if (!spawn.spawning && (spawn.energy / spawn.energyCapacity > .51)) {
            console.log("Spawning");
            var creepType = Memory.creepDesigns[spawnType];
            spawn.spawnCreep([CARRY, WORK, MOVE], "harvester" + Memory.created, {memory :{role: "harvester"}});
            Memory.created++;

        }
    }},
    init: function() {

    if (Memory.factoryInit != undefined) {
        return;
    }
    Memory.factoryInit = true;
    Memory.spawnQ = [];
    Memory.creepDesigns = [creepType.init([CARRY, WORK, MOVE]), "harvester", 1];
    Memory.created = 0;

}
};


