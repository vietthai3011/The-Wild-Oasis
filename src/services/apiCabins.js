import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be leaded");
    }

    return data;
}

const bucketsName = "/storage/v1/object/public/cabin-images//";

export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

    const imageName = `${crypto.randomUUID()}-${newCabin.image.name}`.replaceAll("/", "");

    // https://lxdscohmsqtfjcdckfyp.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg

    // 5ef96d6b-5f8d-4f92-8e14-54e228d8a827-Screenshot 2023-12-08 155225.png
    //"https://lxdscohmsqtfjcdckfyp.supabase.co/storage/v1/object/public/cabin-images//5ef96d6b-5f8d-4f92-8e14-54e228d8a827-Screenshot 2023-12-08 155225.png"

    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}${bucketsName}${imageName}`;

    let query = supabase.from("cabins");

    // 1. Create cabin
    if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

    // 2. Edit cabin

    if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

    const { data, error } = await query.select().single();

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be created");
    }

    // 3. Upload image
    if (hasImagePath) return data;

    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

    // 3. Delete the cabin if there was an error uploading image

    if (storageError) {
        await supabase.from("cabins").delete().eq("id", data.id);

        throw new Error(
            "Cabin image could not be uploaded and the cabin was not created"
        );
    }

    return data;
}

export async function deleteCabin(id) {
    const { error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be delete");
    }
}
