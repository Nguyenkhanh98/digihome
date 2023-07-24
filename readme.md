This project is build from Nestjs for backend API and React TS for Frontend

\*\*\* Please note that react app work well in development, but in production mode get some issues: redirect not work. Such as hit {host}/vi will return 404, action redirect not work when login successm log out sucess,...etc

This may be come from react-router-dom lastest version with vite build.

I have open issues here and still do TShoot

[https://github.com/remix-run/react-router/issues/10729](https://github.com/remix-run/react-router/issues/10729)

\*\* Update: I've use hashRouter(includes # in url) for short-term.

## Project Structure

- `Frontend`: Content Frontend react app and bluprint app
- `backend`: Backend nestjs App
  Please note that this api structure and database schema is not really correct format, structure cause lack of time, But still work well adapt feature
- `cloudformation`: template cloudformation
