<?php

namespace Database\Seeders;

use App\Models\About;
use App\Models\Client;
use App\Models\HowWeWork;
use App\Models\ProjectCategory;
use App\Models\User;
use App\Models\Workflow;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        Workflow::factory()->count(6)->create();

        HowWeWork::factory()->create();

        About::factory()->create();

        Client::factory()->create();

        \App\Models\ProjectCategory::factory(5)->create();
        \App\Models\CrewRole::factory(5)->create();
        \App\Models\TeamName::factory(10)->create();

        \App\Models\Project::factory(16)->create()->each(function ($project) {
            \App\Models\ProjectFile::factory(2)->create(['project_id' => $project->id]);

            for ($i = 0; $i < 2; $i++) {
                \App\Models\ProjectTeam::factory()->create([
                    'id_project' => $project->id,
                    'id_name_crew' => \App\Models\TeamName::inRandomOrder()->first()->id,
                    'id_crew_roles' => \App\Models\CrewRole::inRandomOrder()->first()->id,
                ]);
            }
        });

        ProjectCategory::factory(10)->create();
    }
}
