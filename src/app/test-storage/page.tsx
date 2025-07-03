"use client"

import { useState } from "react"
import { storageService, dbUtils } from "@/lib/database"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestStoragePage() {
  const [testResults, setTestResults] = useState<string[]>([])
  const [testing, setTesting] = useState(false)

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testStorageSetup = async () => {
    setTesting(true)
    setTestResults([])
    
    try {
      addResult("Starting storage tests...")
      
      // Test 1: Create a simple test file
      const testFile = new File(['test content'], 'test-image.jpg', { type: 'image/jpeg' })
      addResult(`Test file created: ${testFile.name}, size: ${testFile.size} bytes`)
      
      // Test 2: Upload the test file
      const fileName = dbUtils.generateImageFileName(testFile.name)
      addResult(`Generated filename: ${fileName}`)
      
      const imageUrl = await storageService.uploadImage(testFile, fileName)
      
      if (imageUrl) {
        addResult(`✅ Upload successful! URL: ${imageUrl}`)
        
        // Test 3: Validate the URL
        const isValid = dbUtils.isValidImageUrl(imageUrl)
        addResult(`URL validation: ${isValid ? '✅ Valid' : '❌ Invalid'}`)
        
        // Test 4: Test accessibility
        const isAccessible = await dbUtils.testImageUrl(imageUrl)
        addResult(`URL accessibility: ${isAccessible ? '✅ Accessible' : '❌ Not accessible'}`)
        
        if (!isAccessible) {
          addResult("⚠️  Image URL is not accessible. This could be due to:")
          addResult("   - Bucket is not public")
          addResult("   - RLS policies are too restrictive")
          addResult("   - CORS configuration issues")
        }
      } else {
        addResult("❌ Upload failed!")
        addResult("Check console for detailed error messages")
      }
      
    } catch (error) {
      addResult(`❌ Test failed with error: ${error}`)
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Storage Configuration Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              This test will verify if your Supabase Storage is configured correctly for image uploads.
            </p>
            
            <Button 
              onClick={testStorageSetup}
              disabled={testing}
              className="w-full"
            >
              {testing ? "Running Tests..." : "Test Storage Setup"}
            </Button>
            
            {testResults.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-3">Test Results:</h3>
                <div className="bg-black text-green-400 p-4 rounded font-mono text-sm max-h-96 overflow-y-auto">
                  {testResults.map((result, index) => (
                    <div key={index} className="mb-1">
                      {result}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold mb-2">If tests fail, check:</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• Supabase project URL and anon key in environment variables</li>
                <li>• Storage bucket 'listing-images' exists</li>
                <li>• Bucket has public access enabled</li>
                <li>• RLS policies allow public read access</li>
                <li>• CORS is configured for your domain</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 