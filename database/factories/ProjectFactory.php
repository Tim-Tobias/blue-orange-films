<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'highlight_link' => $this->faker->url(),
            'title' => $this->faker->sentence(),
            'highlight_image' => $this->faker->imageUrl(),
            'year' => $this->faker->year(),
            'duration' => $this->faker->word(),
            'aspect_ratio' => $this->faker->randomElement(['16:9', '4:3']),
            'description' => $this->faker->paragraph(),
            'client' => $this->faker->company(),
            'agency' => $this->faker->company(),
            'id_project_category' => \App\Models\ProjectCategory::factory(),
        ];
    }
}
