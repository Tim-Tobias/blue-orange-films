<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HowWeWork>
 */
class HowWeWorkFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'content' => '<b>' . $this->faker->words(2, true) . '</b>',
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
