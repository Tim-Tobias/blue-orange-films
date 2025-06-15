<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class AboutRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'content' => ['required', 'string'],
            'is_active' => ['required'],
        ];

        if ($this->isMethod('POST')) {
            $rules['image'] = ['required', 'image', 'max:10240'];
        } else {
            $rules['image'] = ['nullable', 'image', 'max:10240'];
        }

        return $rules;
    }
}