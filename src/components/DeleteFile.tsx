import { deleteFile } from "@/app/actions/db";
import { Button } from "./ui/button";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import Loading from "@/app/loading";

export default function DeleteBtn({ id, uploadthingKey }: { id: string; uploadthingKey: string}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    console.log("delete btn clicked");
    console.log("id: ",id);
    console.log("uploadthingKey: ",uploadthingKey);
    setLoading(true);
    try {
      const res = await deleteFile(id);
    } catch (error) {
        console.log("error in delete btn: ",error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant={"outline"} className="hover:border-red-500" onClick={handleDelete} disabled={loading}>
      {loading ? <Loading /> : <Trash2Icon />}
    </Button>
  );
}


