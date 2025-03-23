'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Control, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'ユーザーネームは少なくとも2文字にしてください。',
  }),
  email: z.string().email({
    message: 'メールアドレスの形式が正しくありません。',
  }),
  password: z.string().min(8, {
    message: 'パスワードは少なくとも8文字にしてください。',
  }),
  hobbies: z.array(
    z.object({
      name: z.string().min(1, {
        message: '趣味を入力してください。',
      }),
    }),
  ),
});

type FormSchema = z.infer<typeof formSchema>;

export function ReactHookForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      hobbies: [{ name: '' }],
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = form;

  const onSubmit = async (data: FormSchema) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ユーザーネーム</FormLabel>
              <FormControl>
                <Input {...field} placeholder="ユーザーネーム" />
              </FormControl>
              <FormDescription>ユーザーネームは2文字以上で入力してください。</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input {...field} placeholder="メールアドレス" />
              </FormControl>
              <FormDescription>メールアドレスの形式で入力してください。</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>パスワード</FormLabel>
              <FormControl>
                <Input {...field} type="password" placeholder="パスワード" />
              </FormControl>
              <FormDescription>パスワードは8文字以上で入力してください。</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Hobbies control={control} />

        <Button type="submit" disabled={!isValid || isSubmitting} className="w-full">
          {isSubmitting ? '送信中...' : '送信'}
        </Button>
      </form>
    </Form>
  );
}

function Hobbies({ control }: { control: Control<FormSchema> }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'hobbies',
  });

  const hobbies = useWatch({
    control,
    name: 'hobbies',
  });

  const hasEmptyHobby = hobbies?.some((hobby) => !hobby.name.trim());

  return (
    <div className="space-y-2">
      <FormLabel>趣味</FormLabel>
      <FormDescription>あなたの趣味を入力してください（複数可）</FormDescription>

      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-2">
          <FormField
            control={control}
            name={`hobbies.${index}.name`}
            render={({ field }) => (
              <FormItem className="mb-0 flex-1">
                <FormControl>
                  <Input {...field} placeholder="趣味を入力" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {index > 0 && (
            <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>
              削除
            </Button>
          )}
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ name: '' })}
        className="mt-2"
        disabled={hasEmptyHobby}
      >
        趣味を追加
      </Button>
    </div>
  );
}
