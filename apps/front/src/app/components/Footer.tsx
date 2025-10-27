import {
  EnvelopeIcon,
  InformationCircleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 pt-10 ">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo / Brand */}
        
        <h2 className="text-xl font-semibold text-white flex items-center">
              <svg className="h-8 w-8 text-primary " fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path></svg>
            <p>
                Blogrr
                </p>
            </h2>

        {/* Links */}
        <div className="flex gap-6 text-sm">
          Made with ❤️ by Mradul Gandhi
        </div>

        {/* Social Icons */}
        <div className="flex gap-5 text-gray-400">
          {/* GitHub */}
          <a
            href="https://github.com/themradul07"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.48 2 2 6.58 2 12.24c0 4.5 2.87 8.32 6.84 9.68.5.1.68-.22.68-.49v-1.71c-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.12-1.49-1.12-1.49-.92-.64.07-.63.07-.63 1.01.07 1.54 1.06 1.54 1.06.9 1.57 2.36 1.12 2.94.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.2 9.2 0 0 1 12 7.5c.85 0 1.7.12 2.5.35 1.9-1.33 2.74-1.05 2.74-1.05.55 1.4.21 2.44.1 2.7.65.71 1.03 1.62 1.03 2.74 0 3.94-2.35 4.81-4.59 5.07.36.33.68.97.68 1.96v2.91c0 .27.18.6.69.49A10.23 10.23 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z"
              />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/mradul-gandhi-744067299/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M19 3A2.99 2.99 0 0 1 22 6v12a2.99 2.99 0 0 1-3 3H5a2.99 2.99 0 0 1-3-3V6a2.99 2.99 0 0 1 3-3h14ZM8.34 17.34v-7.3H5.67v7.3h2.67ZM7 8.7a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1ZM18.33 17.34v-3.8c0-2.2-1.18-3.22-2.76-3.22-1.27 0-1.84.7-2.15 1.2v-1.03h-2.66s.04.67 0 7.85h2.66v-4.38c0-.23.02-.46.08-.63.18-.46.6-.93 1.3-.93.92 0 1.3.7 1.3 1.73v4.21h2.66Z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-sm text-gray-500 mt-4">
        © {new Date().getFullYear()} Blogrr. All rights reserved.
      </div>
    </footer>
  );
}
