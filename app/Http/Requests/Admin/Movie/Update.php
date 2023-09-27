<?php

namespace App\Http\Requests\Admin\Movie;

use Illuminate\Foundation\Http\FormRequest;

class Update extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->hasRole('admin');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'nullable|unique:movies,name,'.$this->movie->id,
            'category' => 'nullable',
            'video_url' => 'nullable|url',
            'thumbnail' => 'nullable|image',
            'rating' => 'nullable|numeric|min:0|max:5',
            'is_feature' => 'nullable|boolean',
        ];
    }
}