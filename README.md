## Running React on Repl.it

[React](https://reactjs.org/) is a popular JavaScript library for building user interfaces.

[Vite](https://vitejs.dev/) is a blazing fast frontend build tool that includes features like Hot Module Reloading (HMR), optimized builds, and TypeScript support out of the box.

Using the two in conjunction is one of the fastest ways to build a web app.

### Getting Started
- Hit run
- Edit [App.tsx](#src/App.tsx) and watch it live update!

By default, Replit runs the `dev` script, but you can configure it by changing the `run` field in the [configuration file](#.replit). Here are the vite docs for [serving production websites](https://vitejs.dev/guide/build.html)


## 作りたい機能メモ

- エラーログの管理
- 参照元とメディアの紐づけ（選ぶのがより簡単に）※その他は常に出る
- URLのメモが作れる？→いるか？？
- コピーボタンはプレビュー枠の横に設置する
- ユーザー管理（ユーザー、パスワード、生成URLの一覧、メモ一覧、CSVダウンロード）
- ラベルをわかりやすい日本語に変える
- タイトル、メモ、URLを保存して永続化する
- さまざまな入力の組み合わせでツールを徹底的にテスト
- URLが正しく構築されているか、特殊文字が適切にエンコードされているかを確認
- タイトルとメモが適切に保存され、再読み込みされることを確認
- ウェブページを公開し、GitHub Pagesなどのプラットフォームでホストして、他のユーザーがアクセスして使用できるようにする。
