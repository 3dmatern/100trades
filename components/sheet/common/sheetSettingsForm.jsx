"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SheetSettingsSchema } from "@/schemas";

export default function SheetSettingsForm({
  userId,
  sheetId,
  itemsData,
  items,
  onSubmit,
  isUpdate = false,
  isPrivate = false
}) {
  const form = useForm({
    resolver: zodResolver(SheetSettingsSchema),
    defaultValues: {
      userId,
      sheetId,
    },
  });

  useEffect(() => {
    form.setValue('items', itemsData);
  }, [itemsData]);

  const getTitle = () => {
    if (isUpdate) {
      return "Обновить настройки публичности";
    } else if (isPrivate) {
      return "Настройки отображения столбцов"
    }

    return "Отображение столбцов в публикации";
  };

  const getNameBtn = () => {
    if (isUpdate || isPrivate) {
      return "Обновить";
    }
    return "Опубликовать";
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <>
              <div className="mb-4">
                <FormLabel className="text-base">
                  {getTitle()}
                </FormLabel>
                <FormDescription>
                  Снимите галочку с полей, которые не хотите отображать.
                </FormDescription>
              </div>
              <FormItem className="grid lg:grid-cols-4 grid-cols-3 gap-1 space-y-0">
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="items"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
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
              <FormMessage className="text-center" />
            </>
          )}
        />

        <Button type="submit" className="h-8">
          {getNameBtn()}
          
        </Button>
      </form>
    </Form>
  );
}
