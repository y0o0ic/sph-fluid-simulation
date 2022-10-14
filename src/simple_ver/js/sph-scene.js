/*
  Copyright 2022 Yasuo Ichinoes

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

const scene_loader = function () {
  physics_frequency = 100;
  physics_period = 1 / physics_frequency;
  world_size = 10;
  physics_world = new PhysicsWorld(world_size, world_size, physics_period, 10);
  physics_world.gravitational_field.y = -9.81;
  physics_world.SPH_target_density = 1000;
  create_fluid_cluster(5, 2.5, 0, 9, 5, 25, 18, physics_world.particle_contact_radius, 1000, true);

  let ship_x = 5.;
  let ship_y = 6.;
  let ship_particle_size = 0.4; //radius
  let floor_density = [300, 250, 250, 50, 50];
  let floor_number = floor_density.length

  let pos_x = 0.;
  let pos_y = 0.;

  let ship_element_size = 0;

  for (let i = 1; i < floor_number+1; i++) {
    pos_y = ship_y + (i - 1) * Math.sqrt(3.) * ship_particle_size;

    let start_x_i = ship_x + (i - 1) * ship_particle_size;
    for (let j = 1; j < i + 1; j++) {
      pos_x = start_x_i - 2.0 * (j - 1) * ship_particle_size;
      physics_world.create_particle(pos_x, pos_y, 0, 0, 0, 0, 0, 0, floor_density[(i - 1)], ship_particle_size, false);
      ship_element_size++;
    }
  }

  let my_particle_no = 0;
  let left_particle_no = 0;
  let down_left_particle_no = 0;
  let down_right_particle_no = 0;

  const all_particle_length = physics_world.particles.length;

  for (let i = 2; i < floor_number + 1; i++) {
    for (let j = 1; j < i + 1; j++) {
      my_particle_no = all_particle_length - (ship_element_size - (((i - 1) * i / 2) + (j-1)));
      left_particle_no = my_particle_no - 1;
      down_left_particle_no = my_particle_no - i;
      down_right_particle_no = down_left_particle_no + 1;
    
      if (j!=1){
        physics_world.create_distance_constraint(physics_world.particles[my_particle_no], physics_world.particles[left_particle_no], ship_particle_size * 2., 1.0);
        physics_world.create_distance_constraint(physics_world.particles[my_particle_no], physics_world.particles[down_left_particle_no], ship_particle_size * 2., 1.0);
      }

      if (j!=i){
        physics_world.create_distance_constraint(physics_world.particles[my_particle_no], physics_world.particles[down_right_particle_no], ship_particle_size * 2., 1.0);
      }
    }
  }
}