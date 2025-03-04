import time
import requests
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView
from your_app.models import HealthFiles, Notification  # Update with your actual app name
from your_app.serializers import GetHealthFilesSerializer, HealthFilesSerializer  # Update with your actual app name

def upload_and_scan_file_to_virustotal(file, api_key):
    url = "https://www.virustotal.com/api/v3/files"
    headers = {
        "x-apikey": api_key,
        "accept": "application/json",
    }
    try:
        response = requests.post(url, headers=headers, files={"file": (file.name, file.read())})
        if response.status_code == 200:
            return response.json()
        else:
            return {"error": True, "message": f"Error {response.status_code}: {response.text}"}
    except Exception as e:
        return {"error": True, "message": str(e)}

def get_and_process_analysis(api_key, analysis_id):
    url = f"https://www.virustotal.com/api/v3/analyses/{analysis_id}"
    headers = {
        "x-apikey": api_key,
        "accept": "application/json",
    }
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        analysis_response = response.json()
        detected_malware = []
        undetected_found = False
        last_analysis_results = analysis_response.get('data', {}).get('attributes', {}).get('results', {})
        if last_analysis_results:
            for engine, result in last_analysis_results.items():
                if result['category'] == 'malicious':
                    detected_malware.append(engine)
                if result['category'] == 'undetected':
                    undetected_found = True
            return detected_malware, undetected_found
        else:
            return {"error": True, "message": "File is being analyzed and may take some time, please try again."}
    except requests.exceptions.RequestException as e:
        return {"error": True, "message": str(e)}

def poll_for_analysis_results(api_key, analysis_id, max_attempts=5, delay=10):
    for _ in range(max_attempts):
        result = get_and_process_analysis(api_key, analysis_id)
        if isinstance(result, dict) and result.get("error"):
            if "File is being analyzed" not in result["message"]:
                return result  # If there's another error, return it
        else:
            return result  # Return the result if it's valid
        time.sleep(delay)  # Wait before polling again
    return {"error": True, "message": "Timeout waiting for analysis results."}

class HealthFilesList(APIView):
    permission_classes = [IsAllowedToWritePatient]

    def get(self, request, format=None):
        health_ins = HealthFiles.objects.filter(patient_id=request.user.id).order_by('-id')
        serializer = GetHealthFilesSerializer(health_ins, many=True)
        return Response({"success": True, 'data': serializer.data})

    def post(self, request, format=None):
        file = request.FILES.get('files')
        allowed_extensions = ['jpg', 'jpeg', 'pdf']
        max_file_size = 5 * 1024 * 1024
        if file:
            file_extension = file.name.split('.')[-1].lower()
            if file_extension not in allowed_extensions:
                return Response({"success": False, "message": "Only JPG, JPEG, and PDF files are allowed."}, status=400)
            if file.size > max_file_size:
                return Response({"success": False, "message": "File size should be less than 5 MB."}, status=400)

            api_key = settings.VIRUS_TOTAL_API_KEY
            vt_response = upload_and_scan_file_to_virustotal(file, api_key)
            if vt_response.get('error'):
                return Response({"success": False, "message": vt_response["message"]}, status=400)

            analysis_id = vt_response['data']['id']
            result = poll_for_analysis_results(api_key, analysis_id)

            if isinstance(result, dict) and result.get("error"):
                return Response({"success": False, "message": result["message"]}, status=400)

            detected_malware, undetected_found = result
            if detected_malware:
                return Response({"success": False, "message": "Virus detected.", "details": detected_malware}, status=400)

        serializer = HealthFilesSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(created_by=request.user.id, patient_id=request.user.id)
            # Notify the doctor about the upload
            Notification.objects.create(
                text=":page_facing_up: Your document has been successfully uploaded and scanned.",
                type_page="Document uploaded",
                patient_id=request.user.id,
            )
            return Response({"success": True, 'data': serializer.data}, status=201)

        return Response({"success": False, "data": serializer.errors}, status=400)




#################################################################################
def upload_and_scan_file_to_virustotal(file, api_key):
    url = "https://www.virustotal.com/api/v3/files"
    headers = {
        "x-apikey": api_key,
        "accept": "application/json",
    }
    try:
        response = requests.post(url, headers=headers, files={"file": (file.name, file.read())})
        if response.status_code == 200:
            return response.json()
        else:
            return {"error": True, "message": f"Error {response.status_code}: {response.text}"}
    except Exception as e:
        return {"error": True, "message": str(e)}
def get_and_process_analysis(api_key, analysis_id):
    url = f"https://www.virustotal.com/api/v3/analyses/{analysis_id}"
    headers = {
        "x-apikey": api_key,
        "accept": "application/json",
    }
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        analysis_response = response.json()
        detected_malware = []
        undetected_found = False
        last_analysis_results = analysis_response.get('data', {}).get('attributes', {}).get('results', {})
        if last_analysis_results:
            for engine, result in last_analysis_results.items():
                if 'category' in result:
                    # if result['category'] == 'malicious' and 'Virus/EICAR_Test_File':
                    #     detected_malware.append(engine)
                    if result['category'] == 'malicious':
                        detected_malware.append(engine)
                    if result['category'] == 'undetected':
                        undetected_found = True
            return detected_malware, undetected_found
        else:
            return {"error": True, "message": "File is being analyzed and may take some time, please try again."}
    except requests.exceptions.RequestException as e:
        return {"error": True, "message": str(e)}
class HealthFilesList(APIView):
    permission_classes = [IsAllowedToWritePatient]
    def get(self, request, format=None):
        health_ins = HealthFiles.objects.filter(patient_id=request.user.id).order_by('-id')
        serializer = GetHealthFilesSerializer(health_ins, many=True)
        return Response({"success": True, 'data': serializer.data})
    def post(self, request, format=None):
        file = request.FILES.get('files')
        allowed_extensions = ['jpg', 'jpeg', 'pdf']
        max_file_size = 5 * 1024 * 1024
        if file:
            file_extension = file.name.split('.')[-1].lower()
            if file_extension not in allowed_extensions:
                return Response({"success": False, "message": "Only JPG, JPEG, and PDF files are allowed."}, status=400)
            if file.size > max_file_size:
                return Response({"success": False, "message": "File size should be less than 5 MB."}, status=400)
            api_key = settings.VIRUS_TOTAL_API_KEY
            vt_response = upload_and_scan_file_to_virustotal(file, api_key)
            if vt_response.get('error'):
                return Response({"success": False, "message": vt_response["message"]}, status=400)
            analysis_id = vt_response['data']['id']
            result = get_and_process_analysis(api_key, analysis_id)
            if isinstance(result, dict) and result.get("error"):
                return Response({"success": False, "message": result["message"]}, status=400)
            detected_malware, undetected_found = result
            if detected_malware:
                return Response({"success": False, "message": "Virus detected.", "details": detected_malware}, status=400)
        serializer = HealthFilesSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(created_by=request.user.id, patient_id=request.user.id)
            # Notify the doctor about the upload
            Notification.objects.create(
                text=":page_facing_up: Your document has been successfully uploaded and scanned.",
                type_page="Document uploaded",
                patient_id=request.user.id,
            )
            return Response({"success": True, 'data': serializer.data}, status=201)
        return Response({"success": False, 'data': serializer.errors}, status=400)