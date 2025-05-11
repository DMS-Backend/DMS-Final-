# Document Management System (DMS)

![DMS Logo](https://via.placeholder.com/1200x300/0066cc/ffffff?text=Document+Management+System)

A modern, responsive document management system built with Next.js and React. This application provides a secure platform for managing, sharing, and collaborating on documents with role-based access control.

## 🚀 Features

- **User Authentication**
  - Secure login and registration
  - Role-based access control (Admin and User roles)
  - Persistent sessions

- **Document Management**
  - Create, view, edit, and delete documents
  - Document categorization and filtering
  - Document metadata and content management

- **User Management (Admin)**
  - Create and manage user accounts
  - Assign user roles and permissions
  - Enable/disable user accounts

- **Dashboard**
  - Overview of system activity
  - Recent documents
  - User statistics (for admins)

- **Responsive Design**
  - Works on desktop, tablet, and mobile devices
  - Dark and light theme support

## 🛠️ Technologies

- **Frontend**
  - Next.js 15 (App Router)
  - React 18
  - TypeScript
  - Tailwind CSS
  - shadcn/ui components

- **State Management**
  - Redux Toolkit
  - React Context API

- **Form Handling**
  - React Hook Form
  - Zod validation

- **Authentication**
  - Custom authentication with localStorage (ready for backend integration)

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or pnpm package manager

## 🔧 Installation

1. **Clone the repository**

\`\`\`bash
git clone https://github.com/yourusername/document-management-system.git
cd document-management-system
\`\`\`

2. **Install dependencies**

\`\`\`bash
npm install
# or
pnpm install
\`\`\`

3. **Run the development server**

\`\`\`bash
npm run dev
# or
pnpm dev
\`\`\`

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🔑 Login Credentials

For testing purposes, you can use the following credentials:

- **Admin User**
  - Email: `admin@example.com`
  - Password: `password`

- **Regular User**
  - Email: `user@example.com`
  - Password: `password`

## 📁 Project Structure

\`\`\`
document-management-system/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Dashboard pages
│   ├── login/              # Authentication pages
│   └── register/
├── components/             # React components
│   ├── dashboard/          # Dashboard-specific components
│   ├── ui/                 # UI components (shadcn)
│   └── theme-provider.tsx  # Theme management
├── lib/                    # Utilities and services
│   ├── redux/              # Redux store and slices
│   ├── auth-context.tsx    # Authentication context
│   └── utils.ts            # Utility functions
├── public/                 # Static assets
└── README.md               # Project documentation
\`\`\`

## 🖥️ Usage

### Authentication

1. Navigate to the login page
2. Enter your credentials or register a new account
3. Upon successful authentication, you'll be redirected to the dashboard

### Dashboard

The dashboard provides an overview of your documents and system activity:

- **Admin Dashboard**: Shows system-wide statistics and access to user management
- **User Dashboard**: Shows personal document statistics and recent activity

### Document Management

1. Navigate to the Documents section
2. Create new documents using the "Create Document" button
3. View, edit, or delete existing documents using the action buttons
4. Filter documents by type or search for specific content

### User Management (Admin Only)

1. Navigate to the Users section
2. Create new users using the "Add User" button
3. Edit user details or permissions using the action buttons
4. Disable user accounts when needed

## 🔮 Future Development

This project is designed to be integrated with microservices in the future:

- **Authentication Service**: Replace local authentication with a dedicated auth service
- **Document Storage Service**: Implement cloud storage for documents
- **User Management Service**: Connect to a user directory service
- **Search and Indexing Service**: Add advanced search capabilities

Additional planned features:

- Document versioning
- Advanced document sharing permissions
- Document templates
- Document workflow and approval processes
- Real-time collaboration

## 📸 Screenshots

![Login Page](https://via.placeholder.com/800x450/0066cc/ffffff?text=Login+Page)
![Dashboard](https://via.placeholder.com/800x450/0066cc/ffffff?text=Dashboard)
![Document Management](https://via.placeholder.com/800x450/0066cc/ffffff?text=Document+Management)
![User Management](https://via.placeholder.com/800x450/0066cc/ffffff?text=User+Management)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Reques
