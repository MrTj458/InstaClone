from django.apps import AppConfig


class CoreConfig(AppConfig):
    """
    Core config.
    """
    name = 'core'

    def ready(self):
        import core.signals
