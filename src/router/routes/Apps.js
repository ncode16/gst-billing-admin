// ** React Imports
import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Chat = lazy(() => import("../../views/apps/chat"));
const Todo = lazy(() => import("../../views/apps/todo"));
const Email = lazy(() => import("../../views/apps/email"));

// User Management
const UserManagement = lazy(() => import("../../views/apps/userManagement"));
const AddUserManagement = lazy(() =>
  import("../../views/apps/userManagement/addUserManagement")
);

// Category Management
const CategoryManagement = lazy(() =>
  import("../../views/apps/categoryManagement")
);
const AddCategoryManagement = lazy(() =>
  import(
    "../../views/apps/categoryManagement/addCategoryManagement/addCategory"
  )
);

// Faq Management

const FaqManagement = lazy(() => import("../../views/apps/faqManagement"));
const AddFaqManagement = lazy(() =>
  import("../../views/apps/faqManagement/addFaqManagement/addFaq")
);

// Tutorial Management
const TutorialManagement = lazy(() =>
  import("../../views/apps/tutorialManagement/")
);
const AddTutorialManagement = lazy(() =>
  import(
    "../../views/apps/tutorialManagement/addTutorialManagement/addTutorial"
  )
);

// Contact Us
const ContactUs = lazy(() => import("../../views/apps/contactUsManagement"));
const AddContactUs = lazy(() => import("../../views/apps/contactUsManagement/addContactUs/addContactUs"))


// template management
const TemplateManagement = lazy(() =>
  import("../../views/apps/templateManagement")
);
const AddTemplateManagement = lazy(() =>
  import(
    "../../views/apps/templateManagement/addTemplateManagement/addTemplate"
  )
);

// cms management
const CmsManagement = lazy(() => import("../../views/apps/cmsManagement"));
const AddCmsManagement = lazy(() =>
  import("../../views/apps/cmsManagement/addCmsManagement/addCms")
);

// Feature Management
const FeatureManagement = lazy(() =>
  import("../../views/apps/featureManagement")
);
const AddFeatureManagement = lazy(() =>
  import("../../views/apps/featureManagement/addFeatureManagement/addFeature")
);

const Kanban = lazy(() => import("../../views/apps/kanban"));
const Calendar = lazy(() => import("../../views/apps/calendar"));

const InvoiceAdd = lazy(() => import("../../views/apps/invoice/add"));
const InvoiceList = lazy(() => import("../../views/apps/invoice/list"));
const InvoiceEdit = lazy(() => import("../../views/apps/invoice/edit"));
const InvoicePrint = lazy(() => import("../../views/apps/invoice/print"));
const InvoicePreview = lazy(() => import("../../views/apps/invoice/preview"));

const EcommerceShop = lazy(() => import("../../views/apps/ecommerce/shop"));
const EcommerceDetail = lazy(() => import("../../views/apps/ecommerce/detail"));
const EcommerceWishlist = lazy(() =>
  import("../../views/apps/ecommerce/wishlist")
);
const EcommerceCheckout = lazy(() =>
  import("../../views/apps/ecommerce/checkout")
);

const UserList = lazy(() => import("../../views/apps/user/list"));
const UserView = lazy(() => import("../../views/apps/user/view"));

const Roles = lazy(() => import("../../views/apps/roles-permissions/roles"));
const Permissions = lazy(() =>
  import("../../views/apps/roles-permissions/permissions")
);

const AppRoutes = [
  {
    element: <UserManagement />,
    path: "/apps/userManagement",
    meta: {
      className: "userManagement-application",
    },
  },
  {
    element: <AddUserManagement />,
    path: "/apps/addUserManagement",
    meta: {
      appLayout: true,
      className: "userManagement-application",
    },
  },
  {
    element: <AddUserManagement />,
    path: "/apps/editUserManagement/:id",
    meta: {
      appLayout: true,
      className: "userManagement-application",
    },
  },
  {
    element: <CategoryManagement />,
    path: "/apps/categoryManagement",
    meta: {
      className: "CategoryManagement-application",
    },
  },
  {
    element: <AddCategoryManagement />,
    path: "/apps/addCategoryManagement",
    meta: {
      className: "CategoryManagement-application",
    },
  },
  {
    element: <AddCategoryManagement />,
    path: "/apps/editCategoryManagement/:id",
    meta: {
      className: "CategoryManagement-application",
    },
  },
  {
    element: <FaqManagement />,
    path: "/apps/faqManagement",
    meta: {
      className: "faqManagement-application",
    },
  },
  {
    element: <AddFaqManagement />,
    path: "/apps/addFaqManagement",
    meta: {
      className: "addFaqManagement-application",
    },
  },
  {
    element: <AddFaqManagement />,
    path: "/apps/editFaqManagement/:id",
    meta: {
      className: "editFaqManagement-application",
    },
  },
  {
    element: <TutorialManagement />,
    path: "/apps/tutorialManagement",
    meta: {
      className: "tutorialManagement-application",
    },
  },
  {
    element: <AddTutorialManagement />,
    path: "/apps/addTutorialManagement",
    meta: {
      className: "addTutorialManagement-application",
    },
  },
  {
    element: <AddTutorialManagement />,
    path: "/apps/editTutorialManagement/:id",
    meta: {
      className: "editTutorialManagement-application",
    },
  },
  {
    element: <ContactUs />,
    path: "/apps/contactUsManagement",
    meta: {
      className: "contactUsManagement-application",
    },
  },
  {
    element: <AddContactUs />,
    path: "/apps/addContactUsManagement",
    meta: {
      className: "contactUsManagement-application",
    },
  },
  {
    element: <TemplateManagement />,
    path: "/apps/templateManagement",
    meta: {
      className: "templateManagement-application",
    },
  },
  {
    element: <AddTemplateManagement />,
    path: "/apps/AddTemplateManagement",
    meta: {
      className: "AddTemplateManagement-application",
    },
  },
  {
    element: <AddTemplateManagement />,
    path: "/apps/editTemplateManagement/:id",
    meta: {
      className: "editTemplateManagement-application",
    },
  },
  {
    element: <CmsManagement />,
    path: "/apps/cmsManagement",
    meta: {
      className: "cmsManagement-application",
    },
  },
  {
    element: <AddCmsManagement />,
    path: "/apps/addCmsManagement",
    meta: {
      className: "addCmsManagement-application",
    },
  },
  {
    element: <AddCmsManagement />,
    path: "/apps/editCmsManagement/:id",
    meta: {
      className: "editCmsManagement-application",
    },
  },
  {
    element: <FeatureManagement />,
    path: "/apps/featureManagement",
    meta: {
      className: "featureManagement-application",
    },
  },
  {
    element: <AddFeatureManagement />,
    path: "/apps/addFeatureManagement",
    meta: {
      className: "addFeatureManagement-application",
    },
  },
  {
    element: <AddFeatureManagement />,
    path: "/apps/editFeatureManagement/:id",
    meta: {
      className: "addFeatureManagement-application",
    },
  },
  // {
  //   element: <Email />,
  //   path: '/apps/email/:folder',
  //   meta: {
  //     appLayout: true,
  //     className: 'email-application'
  //   }
  // },
  {
    element: <Email />,
    path: "/apps/email/label/:label",
    meta: {
      appLayout: true,
      className: "email-application",
    },
  },
  {
    element: <Email />,
    path: "/apps/email/:filter",
  },
  {
    path: "/apps/chat",
    element: <Chat />,
    meta: {
      appLayout: true,
      className: "chat-application",
    },
  },
  {
    element: <Todo />,
    path: "/apps/todo",
    meta: {
      appLayout: true,
      className: "todo-application",
    },
  },
  {
    element: <Todo />,
    path: "/apps/todo/:filter",
    meta: {
      appLayout: true,
      className: "todo-application",
    },
  },
  {
    element: <Todo />,
    path: "/apps/todo/tag/:tag",
    meta: {
      appLayout: true,
      className: "todo-application",
    },
  },
  {
    element: <Calendar />,
    path: "/apps/calendar",
  },
  {
    element: <Kanban />,
    path: "/apps/kanban",
    meta: {
      appLayout: true,
      className: "kanban-application",
    },
  },
  {
    element: <InvoiceList />,
    path: "/apps/invoice/list",
  },
  {
    element: <InvoicePreview />,
    path: "/apps/invoice/preview/:id",
  },
  {
    path: "/apps/invoice/preview",
    element: <Navigate to="/apps/invoice/preview/4987" />,
  },
  {
    element: <InvoiceEdit />,
    path: "/apps/invoice/edit/:id",
  },
  {
    path: "/apps/invoice/edit",
    element: <Navigate to="/apps/invoice/edit/4987" />,
  },
  {
    element: <InvoiceAdd />,
    path: "/apps/invoice/add",
  },
  {
    path: "/apps/invoice/print",
    element: <InvoicePrint />,
    meta: {
      layout: "blank",
    },
  },
  {
    element: <EcommerceShop />,
    path: "/apps/ecommerce/shop",
    meta: {
      className: "ecommerce-application",
    },
  },
  {
    element: <EcommerceWishlist />,
    path: "/apps/ecommerce/wishlist",
    meta: {
      className: "ecommerce-application",
    },
  },
  {
    path: "/apps/ecommerce/product-detail",
    element: (
      <Navigate to="/apps/ecommerce/product-detail/apple-i-phone-11-64-gb-black-26" />
    ),
    meta: {
      className: "ecommerce-application",
    },
  },
  {
    path: "/apps/ecommerce/product-detail/:product",
    element: <EcommerceDetail />,
    meta: {
      className: "ecommerce-application",
    },
  },
  {
    path: "/apps/ecommerce/checkout",
    element: <EcommerceCheckout />,
    meta: {
      className: "ecommerce-application",
    },
  },
  {
    element: <UserList />,
    path: "/apps/user/list",
  },
  {
    path: "/apps/user/view",
    element: <Navigate to="/apps/user/view/1" />,
  },
  {
    element: <UserView />,
    path: "/apps/user/view/:id",
  },
  {
    element: <Roles />,
    path: "/apps/roles",
  },
  {
    element: <Permissions />,
    path: "/apps/permissions",
  },
];

export default AppRoutes;
