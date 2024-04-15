'use client'

import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "../ui/button";
import { UiPagination } from "../uikit/uiPagination";

export function UserAllTags({
  currentPage,
  pageCount,
  userTags,
  onChangePage,
  onClickPrevPage,
  onClickNextPage,
  onRemoveUserTag,
}) {
  const form = useForm({
    defaultValues: {
        items: []
    }
  });
  
  const onSubmit = async (values) => {
    const isRemoved = await onRemoveUserTag(values);
    
    if(isRemoved) {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-max mx-auto space-y-6">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem className="grid lg:grid-cols-4 grid-cols-3 gap-2 space-y-0">
              {userTags?.map((item) => (
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

          {form.getValues('items').length > 0 && <Button
              className="block h-8 mx-auto"
              type="submit"
          >
              Удалить
          </Button>}

          {pageCount > 1 && <UiPagination
              currentPage={currentPage}
              pageCount={pageCount}
              onChangePage={onChangePage}
              onClickPrevPage={onClickPrevPage}
              onClickNextPage={onClickNextPage}
          />}
      </form>
    </Form>
  );
}