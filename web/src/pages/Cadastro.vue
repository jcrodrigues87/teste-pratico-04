<script setup>
import { ref, computed, watch } from 'vue'
import { api } from 'src/boot/axios'

const emit = defineEmits(['voltar', 'alterar-codigo'])

const props = defineProps({
  registro: {
    type: Object,
    default: () => ({ id: -1, tipo: 'I' })
  }
})

const incluindo = computed(() => {
  return props.registro.id === -1 && props.registro.tipo === 'I'
})

const visualizando = computed(() => {
  return (
    props.registro.id > 0 && props.registro.tipo === 'V'
  )
})

const dadosPadrao = {
  razao: null,
  cnpj: null,
  telefone: null,
  // dataAbertura: new Date().toISOString().slice(0, 10),
  email: null,
  cep: null,
  endereco: null,
  numero: null,
  cidade: null,
  estado: null,
  nomeContato: null,
  emailContato: null,
  departamentoContato: null,
  nomeContato1: '',
  emailContato1: '',
  departamentoContato1: ''
}

const dados = ref({ ...Object.assign({}, dadosPadrao) })

const obtemDados = () => {
  if (!props.registro.id || incluindo.value) {
    dados.value = dados
    return
  }

  api
    .get(`/fornecedor/${props.registro.id}`)
    .then(({ data: { data } }) => {
      dados.value = data
    })
}

if (visualizando.value) {
  obtemDados()
}

watch(
  () => props.registro.id,
  (newValue, oldValue) => {
    if (newValue && newValue !== oldValue) {
      obtemDados()
    }
  }
)

const formRef = ref()
const salvar = () => {
  formRef.value.validate().then((sucess) => {
    if (!sucess) return

    if (incluindo.value) {
      // alert('insert')
      api.post('/fornecedor', dados.value)
        .then(({ data: { data } }) => {
          emit('voltar')
          alert('Cadastro incluido com sucesso')
        })
        .catch(() => {
          alert('Email ja cadastrado')
        })
    }
  })
}

console.log(visualizando)
</script>

<template>
  <div>
    <div class='row justify-end items-center'>
      <q-btn
        color='primary'
        icon='west'
        label='voltar'
        @click='emit("voltar")'
        outline
        class='q-mr-sm'
      />
      <q-btn
        v-if='incluindo'
        color='primary'
        icon='save'
        label='salvar'
        @click='salvar'
      />
    </div>
    <q-separator class='q-my-sm' />
    <q-form ref='formRef' >
      <div greedy class='row' style='gap: 0px 10px'>
      <q-input
        v-model='dados.razao'
        label='Razão'
        style='width: 50ch'
        :readonly='!(incluindo)'
        :rules="[val => val && val.length > 0 || 'Campo Obrigatorio']" />
      <q-input
        v-model='dados.cnpj'
        label='CNPJ'
        style='width: 20ch'
        mask="##.###.###/####-##"
        fill-mask
        :readonly='!(incluindo)'
        :rules="[val => val !== null && val !== '' || 'Campo Obrigatorio']"
      />
      <!-- <q-input
        v-model='dados.dataAbertura'
        label='Data Abertura'
        stack-label
        type='date'
        :readonly='!(incluindo)'
      /> -->
      <q-input
        v-model='dados.telefone'
        label='Telefone'
        stack-label
        mask="(##) ##### - ####"
        fill-mask
        :readonly='!(incluindo)'
      />
      <q-input
        v-model='dados.email'
        label='Email'
        type="email"
        stack-label
        :readonly='!(incluindo)'
        :rules="[val => val && val.length > 0 || 'Campo Obrigatorio']" />
      <q-input
        v-model='dados.cep'
        label='CEP'
        stack-label
        mask="##.###-###"
        fill-mask
        :readonly='!(incluindo)'
        :rules="[val => val && val.length > 0 || 'Campo Obrigatorio']" />
      <q-input
        v-model='dados.endereco'
        label='Endereço'
        stack-label
        :readonly='!(incluindo)'
        :rules="[val => val && val.length > 0 || 'Campo Obrigatorio']" />
      <q-input
        v-model='dados.numero'
        label='Numero'
        stack-label
        type="number"
        :readonly='!(incluindo)'
        :rules="[val => val !== null && val !== '' || 'Campo Obrigatorio']" />
      <q-input
        v-model='dados.cidade'
        label='Cidade'
        stack-label
        :readonly='!(incluindo)'
        :rules="[val => val && val.length > 0 || 'Campo Obrigatorio']" />
      <q-input
        v-model='dados.estado'
        label='Estado'
        stack-label
        :readonly='!(incluindo)'
        :rules="[val => val && val.length > 0 || 'Campo Obrigatorio']" />
      </div>
      <h5>Contatos</h5>
      <div greedy class='row' style='gap: 0px 10px'>
      <q-input
        v-model='dados.nomeContato'
        label='Nome'
        stack-label
        :readonly='!(incluindo)'
        :rules="[val => val && val.length > 0 || 'Campo Obrigatorio']" />
      <q-input
        v-model='dados.emailContato'
        label='Email'
        stack-label
        :readonly='!(incluindo)'
        :rules="[val => val && val.length > 0 || 'Campo Obrigatorio']" />
      <q-input
        v-model='dados.departamentoContato'
        label='Departamento'
        stack-label
        :readonly='!(incluindo)'
        :rules="[val => val && val.length > 0 || 'Campo Obrigatorio']" />
        </div>
        <div greedy class='row' style='gap: 0px 10px'>
      <q-input
        v-model='dados.nomeContato1'
        label='Nome'
        stack-label
        :readonly='!(incluindo)'
        />
      <q-input
        v-model='dados.emailContato1'
        label='Email'
        stack-label
        :readonly='!(incluindo)'
        />
      <q-input
        v-model='dados.departamentoContato1'
        label='Departamento'
        stack-label
        :readonly='!(incluindo)'
        />
      </div>
    </q-form>
    <q-separator class='q-my-sm' />
  </div>
</template>
