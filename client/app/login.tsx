import Entypo from '@expo/vector-icons/Entypo';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import { useAuthStore } from '~/store/authStore';

export default function LoginScreen() {
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setError(null); // Clear previous errors
      await login(email, password);
    } catch (error) {
      setError(`Invalid credentials. Please try again!\n${error}`);
    }
  };

  return (
    <View className="flex-1 justify-center bg-black px-6 py-10">
      <Text className="mb-5 text-4xl font-bold text-white">Sign in</Text>
      <Text className="mb-6 text-neutral-500">Log in to your account.</Text>

      {/* Show error message */}
      {error && <Text className="mb-4 text-red-500">{error}</Text>}

      <View className="my-4 flex-row items-center rounded-xl border border-gray-500 p-4">
        <TextInput
          className="flex-1 text-white"
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {email.includes('@') ? <Entypo name="check" size={24} color="white" /> : null}
      </View>

      <View className="mb-6 flex-row items-center rounded-xl border border-gray-500 p-4">
        <TextInput
          className="flex-1 text-white"
          placeholder="Enter your password"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Entypo name={showPassword ? 'eye-with-line' : 'eye'} size={24} color="white" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="rounded-xl bg-violet-500 p-4 shadow-md" onPress={handleLogin}>
        <Text className="text-center text-lg font-semibold text-white">Log in</Text>
      </TouchableOpacity>
    </View>
  );
}
