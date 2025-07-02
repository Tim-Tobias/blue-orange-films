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
            'date' => 'required|date',
            'duration' => 'nullable|string|max:50',
            'category' => 'required|integer|exists:project_categories,id',
            'description' => 'nullable|string',
            'highlight' => $this->isMethod('post') ? 'required' : 'nullable',
            'highlight_image' => $this->isMethod('post') ? 'required' : 'nullable',

            'teams' => 'nullable|array',
            'teams.*.id_name' => 'required|integer',
            'teams.*.name' => 'required|string|max:255',
            'teams.*.id_role' => 'required|integer',
            'teams.*.role' => 'required|string|max:255',

            'files' => 'nullable|array',
            'files.*.title' => 'required|string|max:255',
            'files.*.category' => 'required|in:image,video',
            'files.*.description' => 'nullable|string',
            'files.*.project_link' => $this->isMethod('post') ? 'required' : 'nullable',
        ];
    }
}
