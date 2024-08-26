<script setup>
import { ref, computed } from 'vue';

const inputText = ref('');
const result = ref('');
const isLoading = ref(false);
const error = ref('');

const handleEncrypt = async () => {
  if (!inputText.value) {
    error.value = 'Por favor, ingresa un texto para encriptar.';
    return;
  }
  
  isLoading.value = true;
  error.value = '';
  
  try {
    const response = await fetch('http://localhost:3000/encrypt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: inputText.value }),
    });
    
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
    
    const data = await response.json();
    result.value = data.result;
  } catch (err) {
    error.value = 'Error al encriptar el texto. Por favor, intenta de nuevo.';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const handleDecrypt = async () => {
  if (!inputText.value) {
    error.value = 'Por favor, ingresa un texto para desencriptar.';
    return;
  }
  
  isLoading.value = true;
  error.value = '';
  
  try {
    const response = await fetch('http://localhost:3000/decrypt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: inputText.value }),
    });
    
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
    
    const data = await response.json();
    result.value = data.result;
  } catch (err) {
    error.value = 'Error al desencriptar el texto. Por favor, intenta de nuevo.';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const copyResult = () => {
  navigator.clipboard.writeText(result.value)
    .then(() => {
      alert('Texto copiado al portapapeles');
    })
    .catch(err => {
      console.error('Error al copiar: ', err);
    });
};

const showResult = computed(() => !!result.value);
</script>

<template>
  <div class="app">
    <main class="text-manipulator">
      <div class="logo">
        <img src="./assets/icons/Logo.png" alt="">
      </div>
      <div class="input-area">
        <textarea
          class="text-area"
          v-model="inputText"
          placeholder="Ingrese el texto aquí"
          rows="auto"
        ></textarea>
        <p class="input-note"> <img src="./assets/icons/IconoExclamacion.png" alt="">  Solo letras minúsculas y sin acentos</p>
        <div class="button-group">
          <button type="button" @click="handleEncrypt" class="encrypt" :disabled="isLoading">
            {{ isLoading ? 'Procesando...' : 'Encriptar' }}
          </button>
          <button type="button" @click="handleDecrypt" class="decrypt" :disabled="isLoading">
            {{ isLoading ? 'Procesando...' : 'Desencriptar' }}
          </button>
        </div>
      </div>
    </main>
    <aside class="text-shower">
      <div v-if="!showResult" class="no-result">
        <div class="image-placeholder">
          <img src="./assets/icons/Muñeco.png" alt="">
        </div>
        <h2>Ningún mensaje fue encontrado</h2>
        <p>Ingresa el texto que desees encriptar o desencriptar.</p>
      </div>
      <div v-else class="result">
        <p>{{ result }}</p>
        <button @click="copyResult" class="copy-button">Copiar</button>
      </div>
    </aside>
  </div>
</template>

<style lang="scss" scoped>
.app {
  width: 100%;
  height: 100%;
  background: var(--bg-thirdary);
  display: flex;
  align-items: center;
  flex-wrap:wrap;
  justify-content: center;
  padding: 30px;

  .text-manipulator {
    background-color: inherit;
    width: 600px;
    padding: 20px;
    display: flex;
    flex-direction: column;

    .input-area {
      textarea {
        width: 100%;
        margin-bottom: 10px;
        border: none;
        background: var(--bg-thirdary);
        color: var(--color-secondary);

        &:focus {
          outline: none;
          border: none;
        }
      }

      .input-note {
        font-size: 0.8em;
        margin-bottom: 10px;
        color: var(--color-thirdary);
        display: flex;
        gap: 5px;
        justify-content: left;
        align-items: center;
        
        img {
          aspect-ratio: 1/1;
          width: 10px;
          height: 10px;
        }
      }

      .button-group {
        display: flex;
        gap: 10px;

        button {
          width: 100%;
          padding: 10px 30px;
          border-radius: 15px;
          &.encrypt {
            background-color: var(--bg-primary);
            color: var(--color-primary);
          }
          &.decrypt {
            background-color: var(--bg-button-secondary);
            outline: 1px solid var(--bg-primary);
            color: var(--color-secondary);
          }
        }
      }
    }
  }

  .text-shower {
    background-color: var(--bg-quarter);
    border-radius: 32px;
    flex: 2;
    padding: 20px;
    height: 100%;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .no-result {
      text-align: center;

      .image-placeholder {
        margin: 0 auto 20px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .result {
      width: 100%;
      text-align: center;

      .copy-button {
        margin-top: 10px;
        padding: 5px 15px;
        background-color: var(--bg-primary);
        color: var(--color-primary);
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>