"""router_simple — registration entrypoint."""

from __future__ import annotations

from cortx.registry.model_registry import ModelProviderRegistry
from cortx.registry.module_registry import ModuleRegistry
from cortx.registry.tool_registry import ToolRegistry
from modules.router_simple.router import RouterSimple


def register(
    module_registry: ModuleRegistry,
    tool_registry: ToolRegistry,
    model_registry: ModelProviderRegistry,
) -> None:
    """Register the simple deterministic router."""
    module_registry.register_router("router_simple", RouterSimple())
