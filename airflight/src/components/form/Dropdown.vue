<template>
<select 
    class="form-control"
        :value="value" @input="$emit('input',$event.target.value)">
            <option v-for="entry in options" :key="entry.value" :value="entry.value">
                {{entry.label}}
            </option>
             
    <option>House</option>
</select>
</template>

<script>
export default {
    props: {
        value: String,
        options: Array
    }
}
</script>