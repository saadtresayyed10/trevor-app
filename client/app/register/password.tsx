import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function RegisterScreen2() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View className="flex-1 justify-between bg-black px-6 py-10">
      <View />

      <View>
        <Text className="mb-5 text-4xl font-bold text-white">Sign in</Text>
        <Text className="mb-6 text-neutral-500">Log in to your existing account.</Text>

        {/* Email Input */}
        <View className="my-4 flex-row items-center rounded-xl border border-gray-500 p-4">
          <TextInput
            className="flex-1 text-white"
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            keyboardType="default"
          />
        </View>

        {/* Password Input */}
        <View className="mb-6 flex-row items-center rounded-xl border border-gray-500 p-4">
          <TextInput
            className="flex-1 text-white"
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
      </View>

      {/* Bottom section */}
      <View>
        <TouchableOpacity className="rounded-xl bg-violet-500 p-4 shadow-md">
          <Text
            className="text-center text-lg font-semibold text-white"
            onPress={() => router.push('/register/password')}>
            Next
          </Text>
        </TouchableOpacity>

        <Text className="mt-4 text-center text-neutral-500">
          Already have an account?{' '}
          <Text className="font-semibold text-violet-500" onPress={() => router.push('/login')}>
            Sign In
          </Text>
        </Text>
      </View>
    </View>
  );
}
