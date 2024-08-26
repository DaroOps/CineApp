<script setup>
import { ref, computed } from 'vue';


const inputText = ref('');
const result = ref('');

const handleEncrypt = () => {
  if (inputText.value) {
    // Implementar lógica de encriptación aquí
    result.value = `Encriptado: ${inputText.value}`;
  }
};

const handleDecrypt = () => {
  if (inputText.value) {
    // Implementar lógica de desencriptación aquí
    result.value = `Desencriptado: ${inputText.value}`;
  }
};

const showResult = computed(() => !!result.value);
</script>

<template>
  <div class="app">
    <main class="text-manipulator">
      <h1>a</h1>
      <textarea
        v-model="inputText"
        placeholder="Ingrese el texto aquí"
        rows="10"
      ></textarea>
      <p class="input-note">Solo letras minúsculas y sin acentos</p>
      <div class="button-group">
        <button @click="handleEncrypt" class="encrypt">Encriptar</button>
        <button @click="handleDecrypt" class="decrypt">Desencriptar</button>
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
  justify-content: center;
  padding: 30px;

  .text-manipulator {
    background-color: inherit;
    flex-grow: 1;
    padding: 20px;

    textarea {
      width: 100%;
      margin-bottom: 10px;
    }

    .input-note {
      font-size: 0.8em;
      margin-bottom: 10px;
    }

    .button-group {
      display: flex;
      gap: 10px;

      button {
        padding: 10px 20px;
        &.encrypt {
          background-color: var(--primary-color);
        }
        &.decrypt {
          background-color: var(--secondary-color);
        }
      }
    }
  }

  .text-shower {
    background-color: var(--bg-quarter);
    border-radius: 32px;
    height: 100%;
    width: 400px;
    padding: 20px;
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
    }
  }
}
</style>