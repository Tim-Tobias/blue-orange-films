<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProjectTeam>
 */
class ProjectTeamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id_project' => \App\Models\Project::factory(),
            'id_name_crew' => \App\Models\TeamName::factory(),
            'id_crew_roles' => \App\Models\CrewRole::factory(),
        ];
    }
}
