var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var roleFactory = require('role.factory');

var state = 0;

module.exports.loop = function () {

    switch(state)
    {
        case 0:
        roleFactory.init();
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        console.log('Harvesters: ' + harvesters.length);
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        console.log('upgraders: ' + upgraders.length);
        var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        console.log('builder: ' + upgraders.length);
        
        if(harvesters.length < 2) 
        {
            roleFactory.spawnCreep(0, 1);
        }
        else if (upgraders.length < 2)
        {
            roleFactory.spawnCreep(0, 0);
        }
        else roleFactory.spawnCreep(0, 2);
        
        state = 1;
        break;
        case 1:
        var tower = Game.getObjectById('TOWER_ID');
        if(tower) {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }

            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            }
        }
        state = 2;
        break;
    case 2:
     for(var name in Game.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
        else
        {
        var creep = Game.creeps[name];
        
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
    }
    state = 0;
    break;
    
}
}