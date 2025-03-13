import axios from 'axios';
import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import { useRegisterStore } from '~/store/registerStore';

export default function RegisterScreen2() {
  const { name, email } = useRegisterStore();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (password.length < 8) {
      alert('Password should be at least 8 characters long!');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        'https://welcome-dulcea-groven-a5a35bd1.koyeb.app/api/user/register',
        {
          name,
          email,
          password,
        }
      );

      if (res.data.success) {
        alert('Registration successful! Please log in.');
        router.push('/login');
      } else {
        alert(res.data.message || 'Registration failed. Try again.');
      }
    } catch (error) {
      alert('Error registering user');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-between bg-black px-6 py-10">
      <View />
      <View>
        <Text className="mb-5 text-4xl font-bold text-white">Sign Up</Text>
        <Text className="mb-6 text-neutral-500">Set your password.</Text>

        <View className="my-4 flex-row items-center rounded-xl border border-gray-500 p-4">
          <TextInput
            className="flex-1 text-white"
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View className="mb-6 flex-row items-center rounded-xl border border-gray-500 p-4">
          <TextInput
            className="flex-1 text-white"
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
      </View>

      <View>
        <TouchableOpacity
          className="rounded-xl bg-violet-500 p-4 shadow-md"
          onPress={handleRegister}
          disabled={loading}>
          <Text className="text-center text-lg font-semibold text-white">
            {loading ? 'Signing up...' : 'Sign Up'}
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
