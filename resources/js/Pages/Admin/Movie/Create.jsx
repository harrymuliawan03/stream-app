import Authenticated from "@/Layouts/Authenticated/Index";
import Input from "@/Components/TextInput";
import Label from "@/Components/InputLabel";
import Button from "@/Components/Button";
import InputError from "@/Components/InputError";
import { Head, useForm } from "@inertiajs/react";
import Checkbox from "@/Components/Checkbox";

export default function Create({ auth }) {
    const { setData, post, processing, errors } = useForm({
        name: "",
        category: "",
        video_url: "",
        thumbnail: "",
        rating: "",
        isFeatured: false,
    });

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "file" ? event.target.files[0] : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("admin.dashboard.movie.store"));
    };

    return (
        <Authenticated auth={auth}>
            <Head title="Admin - Create Movie" />
            <h1 className="text-xl">Insert a new Movie</h1>
            <hr className="mb-1" />

            <form className="w-[370px]" onSubmit={submit}>
                <div>
                    <Label>Name of the Movie</Label>
                    <Input
                        type="text"
                        name="name"
                        variant="primary-outline"
                        onChange={onHandleChange}
                        placeholder="Enter the name of movie"
                        isFocused={true}
                        isError={errors.name}
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div>
                    <Label className="mt-4">
                        Category
                    </Label>
                    <Input
                        type="text"
                        name="category"
                        variant="primary-outline"
                        onChange={onHandleChange}
                        placeholder="Enter the category of the movie"
                        isError={errors.category}
                    />
                    <InputError message={errors.category} className="mt-2" />
                </div>
                <div>
                    <Label className="mt-4">
                        Video URL
                    </Label>
                    <Input
                        type="url"
                        name="video_url"
                        variant="primary-outline"
                        onChange={onHandleChange}
                        placeholder="Enter the video url of the movie"
                        isError={errors.video_url}
                    />
                    <InputError message={errors.video_url} className="mt-2" />
                </div>
                <div>
                    <Label className="mt-4">
                        Thumbnail
                    </Label>
                    <Input
                        type="file"
                        name="thumbnail"
                        variant="primary-outline"
                        onChange={onHandleChange}
                        placeholder="Enter the video url of the movie"
                        isError={errors.thumbail}
                    />
                    <InputError message={errors.thumbnail} className="mt-2" />
                </div>
                <div>
                    <Label className="mt-4">
                        Rating
                    </Label>
                    <Input
                        type="number"
                        name="rating"
                        variant="primary-outline"
                        onChange={onHandleChange}
                        placeholder="Enter the rating of the movie"
                        isError={errors.rating}
                    />
                    <InputError message={errors.rating} className="mt-2" />
                </div>

                <div className="flex flex-row mt-4 item-center">
                    <Label className="mr-3" >Is Featured</Label>
                    <Checkbox name="isFeatured" className="mt-1" onChange={(e) => setData("isFeatured", e.target.checked)} />
                </div>


                <div className="grid space-y-[14px] mt-[30px]">
                    <Button
                        type="submit"
                        disabled={processing}
                        processing={processing}
                    >
                        <span className="text-base font-semibold">
                            Add Movie
                        </span>
                    </Button>
                </div>
            </form>
        </Authenticated>
    );
}
