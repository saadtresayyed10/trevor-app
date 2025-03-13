import Entypo from '@expo/vector-icons/Entypo';
import { router } from 'expo-router';
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
      setError(`Invalid credentials. Please try again!`);
      console.log(error);
    }
  };

  return (
    <View className="flex-1 justify-between bg-black px-6 py-10">
      <View />

      <View>
        <Text className="mb-5 text-4xl font-bold text-white">Sign in</Text>
        <Text className="mb-6 text-neutral-500">Log in to your existing account.</Text>

        {error && <Text className="mb-4 text-red-500">{error}</Text>}

        {/* Email Input */}
        <View className="my-4 flex-row items-center rounded-xl border border-gray-500 p-4">
          <TextInput
            className="flex-1 text-white"
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          {email ? (
            email.includes('@') ? (
              <Entypo name="check" size={24} color="white" />
            ) : (
              <Entypo name="cross" size={24} color="red" />
            )
          ) : null}
        </View>

        {/* Password Input */}
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
            {showPassword ? (
              <Entypo name="eye-with-line" size={24} color="white" />
            ) : (
              <Entypo name="eye" size={24} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom section */}
      <View>
        <TouchableOpacity className="rounded-xl bg-violet-500 p-4 shadow-md" onPress={handleLogin}>
          <Text className="text-center text-lg font-semibold text-white">Log in</Text>
        </TouchableOpacity>

        <Text className="mt-4 text-center text-neutral-500">
          Don't have an account?{' '}
          <Text
            className="font-semibold text-violet-500"
            onPress={() => router.push('/register/name-email')}>
            Sign up
          </Text>
        </Text>
      </View>
    </View>
  );
}
