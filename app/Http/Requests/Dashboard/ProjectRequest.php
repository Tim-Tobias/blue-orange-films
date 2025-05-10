<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'year' => 'required|string|max:10',
            'duration' => 'nullable|string|max:50',
            'aspect_ratio' => 'nullable|string|max:20',
            'category' => 'required|integer|exists:project_categories,id',
            'description' => 'nullable|string',
            'highlight' => 'required',
            'highlight_type' => 'required|in:image,video',

            'teams' => 'required|array',
            'teams.*.id_name' => 'required|integer',
            'teams.*.name' => 'required|string|max:255',
            'teams.*.id_role' => 'required|integer',
            'teams.*.role' => 'required|string|max:255',

            'files' => 'nullable|array',
            'files.*.title' => 'required|string|max:255',
            'files.*.category' => 'required|in:image,video',
            'files.*.description' => 'nullable|string',
            'files.*.project_link' => 'required',
        ];
    }
}
