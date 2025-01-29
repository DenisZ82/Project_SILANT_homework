"""
URL configuration for Backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path, include, re_path
from django.views.generic import TemplateView

from rest_framework import routers
from rest_framework import schemas
from rest_framework import permissions

from rest_framework_simplejwt.views import TokenVerifyView, TokenObtainPairView, TokenRefreshView

from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from .views import *
# from App.views import UserGroupsView

router = routers.DefaultRouter()
router.register(r'users', UserViewset)
router.register(r'clients', ClientViewset)
router.register(r'service_companies', ServiceCompanyViewset)
router.register(r'reference_books', ReferenceBooksViewset)
router.register(r'machines', MachineViewset)
router.register(r'maintenance', TechMaintenanceViewset)
router.register(r'complaints', ComplaintsViewset)

schema_view = get_schema_view(
   openapi.Info(
      title="Snippets API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('api/', include(router.urls)),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/auth/login/', LoginView.as_view(), name='rest_login'),
    path('api/auth/logout/', LogoutView.as_view(), name='rest_logout'),
    path('api/auth/user/', UserDetailsView.as_view(), name='rest_user_details'),
    path('api/auth/token/verify/', TokenVerifyView.as_view(), name="token_verify"),
    path('api/auth/token/refresh/', get_refresh_view().as_view(), name="token_refresh"),
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('openapi', schemas.get_schema_view(
        title="App Dishes",
        description="API for all things …"), name='openapi-schema'),
    path('swagger-ui/', TemplateView.as_view(
        template_name='swagger-ui.html',
        extra_context={'schema_url': 'openapi-schema'}),
        name='swagger-ui'),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc')
]

# urlpatterns += [
#     path('api/users/groups/', UserGroupsView.as_view(), name='user-groups'),
# ]

# Ссылки -/swagger.json и /swagger.yaml для вывода схемы API в формате JSON и YAML
