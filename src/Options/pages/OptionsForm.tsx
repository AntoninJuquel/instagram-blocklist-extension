import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { defaultOptions, getOptions, optionsSchema, setOptions } from "@/lib/options";
import { errorLog, infoLog } from "@/utils/log";

export default function OptionsForm() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof optionsSchema>>({
    resolver: zodResolver(optionsSchema),
    defaultValues: getOptions,
    mode: "all",
    reValidateMode: "onChange",
  });

  async function onSubmit(values: z.infer<typeof optionsSchema>) {
    try {
      await setOptions(values);
      infoLog("options", "Options saved.", values);
      form.reset(values);
      toast({
        title: "Options saved.",
        description: "Your options have been saved.",
        duration: 5000,
      })
    } catch (error) {
      errorLog("options", "Failed to save options.", error);
      toast({
        title: "Failed to save options.",
        description: "An error occurred while saving your options.",
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  function onChangeDarkMode(value: boolean) {
    document.documentElement.classList.toggle("dark", value);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Options</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="delayBetweenRequests"
              render={({ field }) => (
                <FormItem className="rounded-lg border p-4">
                  <FormLabel className="text-base">Delay Between Requests</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Enter delay" />
                  </FormControl>
                  <FormDescription>
                    The delay between requests in milliseconds.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="darkMode"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Dark Mode</FormLabel>
                    <FormDescription>Enable dark mode.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={
                        (value) => {
                          field.onChange(value);
                          onChangeDarkMode(value);
                        }
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="autoUpdate"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Auto Update</FormLabel>
                    <FormDescription>Automatically update Block Lists</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-between">
              <div>
                <Button type="submit">Save</Button>
                <Button
                  variant="secondary"
                  type="reset"
                  onClick={() => {
                    form.reset();
                    onChangeDarkMode(form.getValues().darkMode);
                  }}
                >
                  Cancel
                </Button>
              </div>
              <Button
                variant="destructive"
                onClick={() => {
                  form.reset(defaultOptions);
                  onChangeDarkMode(defaultOptions.darkMode);
                }}
              >
                Reset to default
              </Button>
            </div>


          </form>
        </Form>
      </CardContent>
    </Card >
  );
}
