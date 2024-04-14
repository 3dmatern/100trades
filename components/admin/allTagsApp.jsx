'use client'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox"
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

export function AllTagsApp({
    currentPage,
    pageCount,
    adminTags,
    onChangePage,
    onClickPrevPage,
    onClickNextPage,
    onRemoveAdminTag,
}) {
    const form = useForm({
        defaultValues: {
            items: []
        }
    });
    
    const onSubmit = async (values) => {
        await onRemoveAdminTag(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-max mx-auto space-y-6">
                <FormField
                    control={form.control}
                    name="items"
                    render={() => (
                        <FormItem className="grid lg:grid-cols-4 grid-cols-3 gap-1 space-y-0">
                            {adminTags.map((item) => (
                                <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="items"
                                    render={({ field }) => {
                                        return (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.some((t) => t.id === item.id)}
                                                        onCheckedChange={(checked) => {
                                                            return checked
                                                                ? field.onChange([...field.value, item])
                                                                : field.onChange(
                                                                    field.value?.filter(
                                                                        (value) => value.id !== item.id
                                                                    )
                                                                );
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className="text-sm font-normal">
                                                    {item.label}
                                                </FormLabel>
                                            </FormItem>
                                        );
                                    }}
                                />
                            ))}
                        </FormItem>
                    )}
                />

                <Button
                    className="block h-8 mx-auto"
                    type="submit"
                    disabled={form.getValues('items').length === 0}
                >
                    Удалить
                </Button>
            </form>
        </Form>
    );
}