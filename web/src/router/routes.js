
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'fornecedor', component: () => import('pages/IndexPage.vue') },
      { path: 'form-fornecedor/:id?', name: 'formFornecedor', component: () => import('pages/FormFornecedor.vue') }
    ]
  }

  // Always leave this as last one,
  // but you can also remove it
  // {
  //   path: '/:catchAll(.*)*',
  //   component: () => import('pages/ErrorNotFound.vue')
  // }
]

export default routes
