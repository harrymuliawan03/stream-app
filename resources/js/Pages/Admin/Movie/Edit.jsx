import Authenticated from "@/Layouts/Authenticated/Index";
import Input from "@/Components/TextInput";
import Label from "@/Components/InputLabel";
import Button from "@/Components/Button";
import InputError from "@/Components/InputError";
import { Head, useForm, router, usePage } from "@inertiajs/react";
import Checkbox from "@/Components/Checkbox";
import { useEffect } from "react";

export default function Edit({ auth, movie }) {
    const { errors } = usePage().props;
    const { data, setData, processing } = useForm({
        ...movie
    });

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "file" ? event.target.files[0] : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        if(data.thumbnail === movie.thumbnail) {
            delete data.thumbnail;
        }

        router.put(route("admin.dashboard.movie.update", movie.id), {
            ...data
        });
    };

    return (
        <Authenticated auth={auth}>
            <Head title="Admin - Create Movie" />
            <h1 className="text-xl">Update Movie: {movie.name}</h1>
            <hr className="mb-1" />

            <form className="w-[370px]" onSubmit={submit}>
                <div>
                    <Label>Name of the Movie</Label>
                    <Input
                        id="name"
                        type="text"
                        name="name"
                        defaultValue={movie.name}
                        variant="primary-outline"
                        onChange={onHandleChange}
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
                        id="category"
                        type="text"
                        name="category"
                        defaultValue={movie.category}
                        variant="primary-outline"
                        onChange={onHandleChange}
                        isError={errors.category}
                    />
                    <InputError message={errors.category} className="mt-2" />
                </div>
                <div>
                    <Label className="mt-4">
                        Video URL
                    </Label>
                    <Input
                        id="video_url"
                        type="url"
                        name="video_url"
                        defaultValue={movie.video_url}
                        variant="primary-outline"
                        onChange={onHandleChange}
                        isError={errors.video_url}
                    />
                    <InputError message={errors.video_url} className="mt-2" />
                </div>
                <div className="mt-2">
                    <img src={`/storage/${movie.thumbnail}`} width={200} height={200} alt="" />
                    <Label className="mt-4">
                        Thumbnail
                    </Label>
                    <Input
                        id="thumbnail"
                        type="file"
                        name="thumbnail"
                        variant="primary-outline"
                        onChange={onHandleChange}
                        isError={errors.thumbnail}
                    />
                    <InputError message={errors.thumbnail} className="mt-2" />
                </div>
                <div>
                    <Label className="mt-4">
                        Rating
                    </Label>
                    <Input
                        id="rating"
                        type="number"
                        name="rating"
                        defaultValue={movie.rating}
                        variant="primary-outline"
                        onChange={onHandleChange}
                        isError={errors.rating}
                    />
                    <InputError message={errors.rating} className="mt-2" />
                </div>

                <div className="flex flex-row mt-4 item-center">
                    <Label className="mr-3" >Is Featured</Label>
                    <Checkbox name="isFeatured" id="isFeatured" className="mt-1" defaultChecked={movie.isFeatured} onChange={(e) => setData("isFeatured", e.target.checked)} />
                </div>


                <div className="grid space-y-[14px] mt-[30px]">
                    <Button
                        type="submit"
                        disabled={processing}
                        processing={processing}
                    >
                        <span className="text-base font-semibold">
                            Update Movie
                        </span>
                    </Button>
                </div>
            </form>
        </Authenticated>
    );
}
