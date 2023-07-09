"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useStoreModal } from "@/hooks/UseStoreModal";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import { Input } from "../ui/Input";
import Modal from "../ui/Modal";

const formSchema = z.object({
  name: z.string().min(1),
});

function StoreModal() {
  const storeModal = useStoreModal();

  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, onClose] = [storeModal.isOpen, storeModal.onClose];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    try {
      setLoading(true);

      const response = await axios.post("/api/stores", values);

      console.log(response.data);
      toast.success("Store created.");
    } catch (error: any) {
      console.error(error.message);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create new store"
      description="Add a new store to manage products and categories"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Ecommerce"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-6 space-x-2 flex items-center justify-end">
                <Button disabled={loading} variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
}

export default StoreModal;
