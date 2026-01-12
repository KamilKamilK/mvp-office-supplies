<template>
    <div class="mb-3">
        <label :for="id" class="form-label"> {{ label }} </label>

        <input
            :id="id"
            :name="id"
            :value="modelValue"
            :type="type"
            class="form-control"
            :class="{ 'is-invalid': !isValid }"
            placeholder="type here..."
            @input="$emit('update:modelValue', $event.target.value)"
        />

        <div v-if="!isValid" class="invalid-feedback">
            {{ errorMessage }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'FormInput',
    props: {
        id: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        errorMessage: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'text',
        },
        modelValue: {
            type: [String, Number],
            default: '',
        },
    },
    emits: ['input', 'update:modelValue'],
    computed: {
        isValid() {
            return !this.errorMessage;
        },
    },
};
</script>
