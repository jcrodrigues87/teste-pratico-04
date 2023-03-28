<script setup>
import { api } from 'src/boot/axios'
import { nextTick, ref } from 'vue'
import Cadastro from './Cadastro.vue'

const filtrosPadrao = {
  pesquisa: '',
  razao: null,
  cnpj: null,
  email: null
}
const filtros = ref(Object.assign({}, filtrosPadrao))

const colunas = [
  {
    name: 'razao',
    field: 'razao',
    label: 'Razão',
    sortable: true,
    align: 'left'
  },
  {
    name: 'cnpj',
    field: 'cnpj',
    label: 'CNPJ',
    sortable: true,
    align: 'left',
    format: (val) => formatarCpfCnpj(val)
  },
  {
    name: 'telefone',
    field: 'telefone',
    label: 'Telefone',
    sortable: true,
    align: 'left',
    format: (val) => formatarTelefone(val)
  },
  {
    name: 'email',
    field: 'email',
    label: 'Email',
    sortable: true,
    align: 'left'
  },
  {
    name: 'dataAbertura',
    field: 'dataAbertura',
    label: 'Data de Abertura',
    sortable: true,
    align: 'left',
    format: (val) => convertDataHora(val)
  }
]

const dados = ref([])
const obtemDados = () => {
  const filtro = Object.entries(filtros.value).filter(
    (e) => e && e[1] !== null && !!e[1]
  )
  api.get(
      `/fornecedor/listagem?${
        filtro
          ? filtro
              .map(
                (e) =>
                  `${e[0]}=${
                    Array.isArray(e[1])
                      ? e[1].join(';')
                      : String(e[1])?.replace(/\n/g, ';')
                  }`
              )
              .join('&')
          : ''
      }`)
    .then(({ data: { data } }) => {
      dados.value = data
    })
}

const limparFiltros = () => {
  filtros.value = Object.assign({}, filtrosPadrao)

  nextTick(() => {
    obtemDados()
  })
}

obtemDados()

const convertDataHora = (data = '') => {
  if (!data || String(data).length < 8) {
    return
  }
  return new Date(data.slice(0, 10).split('-')).toLocaleDateString('pt-BR')
}

const formatarTelefone = (valor = '') => {
  const telefone = valor.replace(/\D/g, '')

  if (telefone.length === 10) {
    return telefone.replace(/(\d{2})(\d{4})(\d{4})/g, '($1) $2-$3')
  } else if (telefone.length === 11) {
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/g, '($1) $2-$3')
  }
}

const formatarCpfCnpj = (valor = '') => {
  const cnpjCpf = valor.replace(/\D/g, '')

  if (cnpjCpf.length === 11) {
    return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')
  }

  return cnpjCpf.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
    '$1.$2.$3/$4-$5'
  )
}

const registro = ref({
  id: null,
  tipo: 'I'
})

const seleciona = ({ id }, tipo = 'V') => {
  registro.value = { tipo: tipo, id: id }
}

</script>

<template>
  <q-page padding>
  <div>
    <keep-alive>
      <template v-if="!registro.id">
        <div class='row justify-between'>
          <div class='row'>
            <q-input
              v-model='filtros.pesquisa'
              label='Pesquisa'
              style='min-width: 500px'
              class='q-mr-sm'
            >
            </q-input>
            <q-btn
              icon='filter_alt'
              flat
              round
            >
              <q-tooltip> Filtros </q-tooltip>
              <q-menu>
                <div
                  class='bg-white q-pa-md'
                  style='min-width: 900px min-height: 100px'
                >
                <q-input
                  v-model="filtros.razao"
                  class="q-mr-sm q-mb-sm"
                  label="Razão"
                  clearable
                />
                <q-input
                  v-model="filtros.cnpj"
                  class="q-mr-sm q-mb-sm"
                  label="CNPJ"
                  mask="##.###.###/####-##"
                  clearable
                />
                <q-input
                  v-model="filtros.email"
                  class="q-mr-sm q-mb-sm"
                  label="Email"
                  clearable
                />
                  <div class='row justify-end q-mt-sm'>
                    <q-btn
                      class='q-mr-sm'
                      color='primary'
                      outline
                      label='Limpar'
                      icon='clear'
                      @click='limparFiltros'
                    />
                    <q-btn
                      color='primary'
                      outline
                      label='Pesquisar'
                      icon='search'
                      @click='obtemDados'
                    />
                  </div>
                </div>
              </q-menu>
            </q-btn>
          </div>
          <div class="row items-center">
            <q-btn
              class="q-mr-sm"
              color='primary'
              icon='add'
              label='Novo'
              @click='seleciona({id:-1}, "I")'
            />
            <q-btn
              class="q-mr-sm"
              color='primary'
              icon='sync'
              label='Atualizar'
              @click='obtemDados'
            />
          </div>
        </div>
        <q-separator class='q-my-sm' />

        <q-table
          :rows='dados'
          :columns='colunas'
          row-key='id'
          :filter='filtros.pesquisa'
          class='tabela-fixa'
          :rows-per-page-options='[40, 60, 80, -1]'
          style='height: calc(100vh - 150px)'
          @row-dblclick="(_, linha) => seleciona(linha, 'V')"
        >
        </q-table>
      </template>
    </keep-alive>
  <keep-alive>
      <Cadastro
        v-if="registro.id"
        :registro="registro"
        @voltar="
          registro = {
            tipo: 'V',
            id: null,
          };
          obtemDados()
        "
        @alterar-codigo='registro = $event'
      />
    </keep-alive>
  </div>
  </q-page>
</template>

<style scoped>
</style>
