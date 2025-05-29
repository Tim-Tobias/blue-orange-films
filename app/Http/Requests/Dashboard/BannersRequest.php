<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class BannersRequest extends FormRequest
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
        return [
            'title' => ['nullable', 'string', 'max:255'],
            'section' => $this->isMethod('post') ? ['required', 'string', 'max:255'] : ['nullable', 'string', 'max:255'],
            'banner' => $this->isMethod('post') ? 'required' : 'nullable',
            'category' => 'required|in:image,video',
        ];
    }
}
