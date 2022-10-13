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
  create_fluid_cluster(5, 2.7, 0, 9, 5, 25, 18, physics_world.particle_contact_radius, 1000, true);
  physics_world.create_particle(5, 8, 0, 0, 0, 0, 0, 0, 200, 1., false);
}