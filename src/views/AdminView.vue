<template>
  <div class="admin-view">
    <!-- Header -->
    <header class="admin-header">
      <div class="container">
        <div class="admin-header__inner">
          <div class="admin-header__brand">
            <span class="admin-header__logo"><i class="bi bi-sliders2"></i></span>
            <div>
              <h1 class="admin-header__title">Painel Administrativo</h1>
              <p class="admin-header__subtitle">Edite cada componente do site</p>
            </div>
          </div>
          <div class="admin-header__actions">
            <router-link to="/" class="btn btn-soft" target="_blank">
              <i class="bi bi-eye me-2"></i>Ver site
            </router-link>
            <button @click="handleLogout" class="btn btn-outline-light">
              <i class="bi bi-box-arrow-right me-2"></i>Sair
            </button>
          </div>
        </div>
      </div>
    </header>

    <section class="admin-body py-4">
      <div class="container">
        <!-- Tabs -->
        <ul class="nav nav-pills admin-tabs mb-4 flex-wrap" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" data-bs-toggle="pill" data-bs-target="#site-content" type="button"><i class="bi bi-globe me-2"></i>Site</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" data-bs-toggle="pill" data-bs-target="#navbar-content" type="button"><i class="bi bi-list me-2"></i>Navbar</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" data-bs-toggle="pill" data-bs-target="#hero-content" type="button"><i class="bi bi-house-heart me-2"></i>Hero</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" data-bs-toggle="pill" data-bs-target="#sections-content" type="button"><i class="bi bi-stack me-2"></i>Seções</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" data-bs-toggle="pill" data-bs-target="#about-content" type="button"><i class="bi bi-person-badge me-2"></i>Sobre</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" data-bs-toggle="pill" data-bs-target="#services-content" type="button"><i class="bi bi-grid-1x2 me-2"></i>Serviços</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" data-bs-toggle="pill" data-bs-target="#contact-content" type="button"><i class="bi bi-telephone me-2"></i>Contato</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" data-bs-toggle="pill" data-bs-target="#footer-content" type="button"><i class="bi bi-footer me-2"></i>Rodapé</button>
          </li>
        </ul>

        <div class="tab-content">
          <!-- ═══ SITE ═══ -->
          <div class="tab-pane fade show active" id="site-content">
            <div class="editor-card">
              <div class="editor-card__head"><h3 class="editor-card__title"><i class="bi bi-globe me-2"></i>Identidade do Site</h3></div>
              <div class="editor-card__body">
                <form @submit.prevent="saveSite">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <label class="form-label fw-semibold">Nome do Site</label>
                      <input type="text" class="form-control" v-model="site.name" required>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-semibold">CRP</label>
                      <input type="text" class="form-control" v-model="site.crp">
                    </div>
                    <div class="col-12">
                      <label class="form-label fw-semibold">Slogan / Tagline</label>
                      <input type="text" class="form-control" v-model="site.tagline">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-semibold">Localização</label>
                      <input type="text" class="form-control" v-model="site.location">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-semibold">WhatsApp (c/ código)</label>
                      <input type="text" class="form-control" v-model="site.whatsappNumber" placeholder="5511999999999">
                    </div>
                    <div class="col-12">
                      <label class="form-label fw-semibold">Descrição de Atendimento</label>
                      <textarea class="form-control" rows="2" v-model="site.locationDesc"></textarea>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-save mt-3" :disabled="saving"><i class="bi bi-check2-circle me-2"></i>Salvar Site</button>
                </form>
              </div>
            </div>
          </div>

          <!-- ═══ NAVBAR ═══ -->
          <div class="tab-pane fade" id="navbar-content">
            <div class="editor-card">
              <div class="editor-card__head"><h3 class="editor-card__title"><i class="bi bi-list me-2"></i>Navbar</h3></div>
              <div class="editor-card__body">
                <form @submit.prevent="saveNavbar">
                  <div class="mb-3">
                    <label class="form-label fw-semibold">Marca (logo texto)</label>
                    <input type="text" class="form-control" v-model="navbar.brand">
                  </div>
                  <div class="mb-3">
                    <label class="form-label fw-semibold">Texto do Botão (CTA)</label>
                    <input type="text" class="form-control" v-model="navbar.ctaLabel">
                  </div>
                  <label class="form-label fw-semibold">Itens do Menu</label>
                  <div v-for="(item, i) in navbar.items" :key="i" class="row g-2 mb-2 align-items-center">
                    <div class="col-5">
                      <input type="text" class="form-control" v-model="item.label" placeholder="Rótulo">
                    </div>
                    <div class="col-5">
                      <input type="text" class="form-control" v-model="item.target" placeholder="alvo (id da seção)">
                    </div>
                    <div class="col-2">
                      <button type="button" class="btn btn-sm btn-outline-danger w-100" @click="navbar.items.splice(i,1)"><i class="bi bi-trash"></i></button>
                    </div>
                  </div>
                  <button type="button" class="btn btn-add btn-sm mb-3" @click="navbar.items.push({ id: 'item'+Date.now(), label: '', target: '' })"><i class="bi bi-plus-lg me-1"></i>Adicionar item</button>
                  <button type="submit" class="btn btn-save w-100" :disabled="saving"><i class="bi bi-check2-circle me-2"></i>Salvar Navbar</button>
                </form>
              </div>
            </div>
          </div>

          <!-- ═══ HERO ═══ -->
          <div class="tab-pane fade" id="hero-content">
            <div class="row g-4">
              <div class="col-lg-6">
                <div class="editor-card">
                  <div class="editor-card__head"><h3 class="editor-card__title"><i class="bi bi-house-heart me-2"></i>Editar Hero</h3></div>
                  <div class="editor-card__body">
                    <form @submit.prevent="saveHero">
                      <div class="mb-3"><label class="form-label fw-semibold">Linha 1</label><input type="text" class="form-control" v-model="hero.titleLine1"></div>
                      <div class="mb-3"><label class="form-label fw-semibold">Linha 2 (itálico)</label><input type="text" class="form-control" v-model="hero.titleLine2"></div>
                      <div class="mb-3"><label class="form-label fw-semibold">Linha 3</label><input type="text" class="form-control" v-model="hero.titleLine3"></div>
                      <div class="mb-3"><label class="form-label fw-semibold">Texto do Botão</label><input type="text" class="form-control" v-model="hero.ctaLabel"></div>
                      <div class="mb-3">
                        <label class="form-label fw-semibold">Imagem</label>
                        <div class="upload-zone" :class="{ 'upload-zone--filled': hero.image }">
                          <img v-if="hero.image" :src="hero.image" class="upload-zone__preview" alt="">
                          <div v-else class="upload-zone__placeholder"><i class="bi bi-image"></i><span>Clique para enviar</span></div>
                          <input type="file" class="upload-zone__input" accept="image/*" @change="handleImageUpload($event, 'hero')">
                          <button v-if="hero.image" type="button" class="upload-zone__remove btn btn-sm btn-light" @click="hero.image = ''"><i class="bi bi-trash me-1"></i>Remover</button>
                        </div>
                      </div>
                      <button type="submit" class="btn btn-save w-100" :disabled="saving"><i class="bi bi-check2-circle me-2"></i>Salvar Hero</button>
                    </form>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="preview-card">
                  <span class="preview-card__tag"><i class="bi bi-eye me-1"></i>Pré-visualização</span>
                  <div class="hero-preview" :style="hero.image ? { backgroundImage: `url(${hero.image})` } : {}">
                    <div class="hero-preview__overlay"></div>
                    <div class="hero-preview__content">
                      <h4 class="hero-preview__title">{{ hero.titleLine1 }} {{ hero.titleLine2 }} {{ hero.titleLine3 }}</h4>
                      <span class="hero-preview__cta">{{ hero.ctaLabel }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ═══ SECTIONS ═══ -->
          <div class="tab-pane fade" id="sections-content">
            <div class="editor-card">
              <div class="editor-card__head d-flex justify-content-between align-items-center">
                <h3 class="editor-card__title mb-0"><i class="bi bi-stack me-2"></i>Gerenciar Seções</h3>
                <button type="button" class="btn btn-add btn-sm" @click="showAddSection = !showAddSection"><i class="bi bi-plus-lg me-1"></i>Nova seção</button>
              </div>
              <div class="editor-card__body">
                <!-- Add new section form -->
                <div v-if="showAddSection" class="add-section-box mb-4">
                  <div class="row g-2 align-items-end">
                    <div class="col-md-4"><label class="form-label fw-semibold">Título</label><input type="text" class="form-control" v-model="newSection.title" placeholder="Ex: Depoimentos"></div>
                    <div class="col-md-4">
                      <label class="form-label fw-semibold">Tipo</label>
                      <select class="form-select" v-model="newSection.type">
                        <option value="custom">Personalizada (texto + cards)</option>
                        <option value="perspective">Perspectiva</option>
                        <option value="approach">Diferenciais</option>
                        <option value="schedule">Agenda</option>
                        <option value="reviews">Depoimentos</option>
                        <option value="faq">FAQ</option>
                      </select>
                    </div>
                    <div class="col-md-4"><button type="button" class="btn btn-save w-100" @click="addNewSection"><i class="bi bi-check2 me-1"></i>Adicionar</button></div>
                  </div>
                </div>

                <!-- Section list -->
                <div v-for="(section, i) in sections" :key="section.id" class="section-manage-card">
                  <div class="section-manage-card__head">
                    <div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" :id="'sec'+section.id" v-model="section.enabled" @change="toggleSection(section)">
                      <label class="form-check-label fw-semibold" :for="'sec'+section.id">{{ section.title || '(sem título)' }}</label>
                    </div>
                    <div class="section-manage-card__actions">
                      <button type="button" class="btn btn-sm btn-light" :disabled="i===0" @click="moveSection(section.id, -1)" title="Subir"><i class="bi bi-arrow-up"></i></button>
                      <button type="button" class="btn btn-sm btn-light" :disabled="i===sections.length-1" @click="moveSection(section.id, 1)" title="Descer"><i class="bi bi-arrow-down"></i></button>
                      <button type="button" class="btn btn-sm btn-outline-danger" @click="removeSection(section)" title="Remover"><i class="bi bi-trash"></i></button>
                    </div>
                  </div>
                  <div class="section-manage-card__body">
                    <div class="row g-2">
                      <div class="col-md-6"><label class="form-label">Título da seção</label><input type="text" class="form-control form-control-sm" v-model="section.title"></div>
                      <div class="col-md-6"><label class="form-label">Tipo</label>
                        <select class="form-select form-select-sm" v-model="section.type" @change="ensureSectionContent(section)">
                          <option value="custom">Personalizada</option>
                          <option value="perspective">Perspectiva</option>
                          <option value="approach">Diferenciais</option>
                          <option value="schedule">Agenda</option>
                          <option value="reviews">Depoimentos</option>
                          <option value="faq">FAQ</option>
                        </select>
                      </div>
                    </div>
                    <!-- Type-specific fields -->
                    <div v-if="section.type === 'custom'" class="mt-2">
                      <label class="form-label">Subtítulo / Label</label>
                      <input type="text" class="form-control form-control-sm mb-2" v-model="section.content.label">
                      <label class="form-label">Título (pode usar HTML)</label>
                      <input type="text" class="form-control form-control-sm mb-2" v-model="section.content.heading">
                      <label class="form-label">Texto rico (HTML)</label>
                      <textarea class="form-control form-control-sm mb-2" rows="3" v-model="section.content.body"></textarea>
                      <label class="form-label">Texto do botão (opcional)</label>
                      <input type="text" class="form-control form-control-sm" v-model="section.content.ctaLabel">
                    </div>
                    <div v-else-if="section.type === 'schedule'" class="mt-2">
                      <label class="form-label">Label</label>
                      <input type="text" class="form-control form-control-sm mb-2" v-model="section.content.label">
                      <label class="form-label">Título (HTML)</label>
                      <input type="text" class="form-control form-control-sm mb-2" v-model="section.content.heading">
                      <label class="form-label">Descrição</label>
                      <input type="text" class="form-control form-control-sm mb-2" v-model="section.content.description">
                      <label class="form-label">URL do Google Calendar</label>
                      <input type="url" class="form-control form-control-sm" v-model="section.content.calendarUrl">
                    </div>
                    <div v-else-if="section.type === 'reviews'" class="mt-2">
                      <label class="form-label">Label</label>
                      <input type="text" class="form-control form-control-sm mb-2" v-model="section.content.label">
                      <label class="form-label">Título (HTML)</label>
                      <input type="text" class="form-control form-control-sm mb-2" v-model="section.content.heading">
                      <label class="form-label">Avaliação (ex: 5.0 / 5.0)</label>
                      <input type="text" class="form-control form-control-sm" v-model="section.content.rating">
                    </div>
                    <div v-else-if="section.type === 'faq'" class="mt-2">
                      <label class="form-label">Label</label>
                      <input type="text" class="form-control form-control-sm mb-2" v-model="section.content.label">
                      <label class="form-label">Título (HTML)</label>
                      <input type="text" class="form-control form-control-sm" v-model="section.content.heading">
                    </div>
                    <div v-else-if="section.type === 'perspective'" class="mt-2">
                      <label class="form-label">Label</label>
                      <input type="text" class="form-control form-control-sm mb-2" v-model="section.content.label">
                      <label class="form-label">Título (HTML)</label>
                      <input type="text" class="form-control form-control-sm mb-2" v-model="section.content.heading">
                      <label class="form-label">URL da imagem</label>
                      <input type="text" class="form-control form-control-sm mb-2" v-model="section.content.image">
                      <label class="form-label">Conclusão (HTML)</label>
                      <textarea class="form-control form-control-sm" rows="2" v-model="section.content.conclusion"></textarea>
                    </div>
                    <div v-else-if="section.type === 'approach'" class="mt-2">
                      <label class="form-label">Label</label>
                      <input type="text" class="form-control form-control-sm mb-2" v-model="section.content.label">
                      <label class="form-label">Título (HTML)</label>
                      <input type="text" class="form-control form-control-sm mb-2" v-model="section.content.heading">
                      <label class="form-label">Introdução</label>
                      <textarea class="form-control form-control-sm" rows="2" v-model="section.content.intro"></textarea>
                    </div>
                    <button type="button" class="btn btn-save btn-sm mt-3" :disabled="saving" @click="saveSections"><i class="bi bi-check2-circle me-1"></i>Salvar seções</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ═══ ABOUT ═══ -->
          <div class="tab-pane fade" id="about-content">
            <div class="row g-4">
              <div class="col-lg-6">
                <div class="editor-card">
                  <div class="editor-card__head"><h3 class="editor-card__title"><i class="bi bi-person-badge me-2"></i>Editar Sobre</h3></div>
                  <div class="editor-card__body">
                    <form @submit.prevent="saveAbout">
                      <div class="mb-3"><label class="form-label fw-semibold">Título</label><input type="text" class="form-control" v-model="about.title"></div>
                      <div class="mb-3"><label class="form-label fw-semibold">Texto</label><textarea class="form-control" rows="5" v-model="about.text"></textarea></div>
                      <div class="mb-3"><label class="form-label fw-semibold">Título da Abordagem</label><input type="text" class="form-control" v-model="about.approachTitle"></div>
                      <div class="mb-2"><label class="form-label fw-semibold">Abordagens</label></div>
                      <div v-for="(a, i) in about.approaches" :key="i" class="service-edit-card">
                        <div class="mb-2"><input type="text" class="form-control form-control-sm mb-1" placeholder="Ícone (ex: bi bi-brain)" v-model="a.icon"><input type="text" class="form-control form-control-sm mb-1" placeholder="Título" v-model="a.title"><textarea class="form-control form-control-sm" rows="2" placeholder="Descrição" v-model="a.desc"></textarea></div>
                        <button type="button" class="btn btn-sm btn-link text-danger" @click="about.approaches.splice(i,1)"><i class="bi bi-trash me-1"></i>Remover</button>
                      </div>
                      <button type="button" class="btn btn-add btn-sm mb-3" @click="about.approaches.push({ icon: 'bi bi-star', title: '', desc: '' })"><i class="bi bi-plus-lg me-1"></i>Adicionar</button>
                      <div class="mb-3">
                        <label class="form-label fw-semibold">Foto de Perfil</label>
                        <div class="upload-zone upload-zone--avatar" :class="{ 'upload-zone--filled': about.image }">
                          <img v-if="about.image" :src="about.image" class="upload-zone__preview upload-zone__preview--avatar" alt="">
                          <div v-else class="upload-zone__placeholder"><i class="bi bi-person"></i><span>Foto</span></div>
                          <input type="file" class="upload-zone__input" accept="image/*" @change="handleImageUpload($event, 'about')">
                          <button v-if="about.image" type="button" class="upload-zone__remove btn btn-sm btn-light" @click="about.image = ''"><i class="bi bi-trash me-1"></i>Remover</button>
                        </div>
                      </div>
                      <button type="submit" class="btn btn-save w-100" :disabled="saving"><i class="bi bi-check2-circle me-2"></i>Salvar Sobre</button>
                    </form>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="preview-card">
                  <span class="preview-card__tag"><i class="bi bi-eye me-1"></i>Pré-visualização</span>
                  <div class="about-preview">
                    <img v-if="about.image" :src="about.image" class="about-preview__avatar" alt="">
                    <div v-else class="about-preview__avatar about-preview__avatar--empty"><i class="bi bi-person"></i></div>
                    <h5>{{ about.title }}</h5>
                    <p class="about-preview__text">{{ about.text }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ═══ SERVICES ═══ -->
          <div class="tab-pane fade" id="services-content">
            <div class="editor-card">
              <div class="editor-card__head"><h3 class="editor-card__title"><i class="bi bi-grid-1x2 me-2"></i>Gerenciar Serviços</h3></div>
              <div class="editor-card__body">
                <form @submit.prevent="saveServices">
                  <div class="row g-2 mb-3">
                    <div class="col-md-6"><label class="form-label fw-semibold">Título da página</label><input type="text" class="form-control" v-model="services.title"></div>
                    <div class="col-md-6"><label class="form-label fw-semibold">Subtítulo</label><input type="text" class="form-control" v-model="services.subtitle"></div>
                  </div>
                  <div v-for="(s, i) in services.items" :key="i" class="service-edit-card">
                    <div class="service-edit-card__head">
                      <span class="service-edit-card__num">{{ String(i+1).padStart(2,'0') }}</span>
                      <button type="button" class="btn btn-sm btn-link text-danger" @click="services.items.splice(i,1)"><i class="bi bi-trash me-1"></i>Remover</button>
                    </div>
                    <div class="mb-2"><input type="text" class="form-control form-control-sm mb-1" placeholder="Ícone (ex: bi bi-person)" v-model="s.icon"></div>
                    <div class="mb-2"><input type="text" class="form-control form-control-sm mb-1" placeholder="Título" v-model="s.title"></div>
                    <div class="mb-2"><textarea class="form-control form-control-sm mb-1" rows="2" placeholder="Descrição" v-model="s.description"></textarea></div>
                    <div class="mb-2"><input type="text" class="form-control form-control-sm mb-1" placeholder="Preço (ex: R$ 200/sessão)" v-model="s.price"></div>
                    <textarea class="form-control form-control-sm" rows="2" placeholder="Recursos (um por linha)" v-model="s._features"></textarea>
                  </div>
                  <button type="button" class="btn btn-add btn-sm mb-3" @click="services.items.push({ icon:'bi bi-star', title:'', description:'', price:'', _features:'' })"><i class="bi bi-plus-lg me-1"></i>Adicionar serviço</button>
                  <hr>
                  <label class="form-label fw-semibold">Título do FAQ</label>
                  <input type="text" class="form-control mb-2" v-model="services.faqTitle">
                  <div v-for="(f, i) in services.faqs" :key="i" class="service-edit-card">
                    <div class="mb-2"><input type="text" class="form-control form-control-sm mb-1" placeholder="Pergunta" v-model="f.question"></div>
                    <div class="mb-2"><textarea class="form-control form-control-sm" rows="2" placeholder="Resposta" v-model="f.answer"></textarea></div>
                    <button type="button" class="btn btn-sm btn-link text-danger" @click="services.faqs.splice(i,1)"><i class="bi bi-trash me-1"></i>Remover</button>
                  </div>
                  <button type="button" class="btn btn-add btn-sm mb-3" @click="services.faqs.push({ question:'', answer:'' })"><i class="bi bi-plus-lg me-1"></i>Adicionar FAQ</button>
                  <button type="submit" class="btn btn-save w-100" :disabled="saving"><i class="bi bi-check2-circle me-2"></i>Salvar Serviços</button>
                </form>
              </div>
            </div>
          </div>

          <!-- ═══ CONTACT ═══ -->
          <div class="tab-pane fade" id="contact-content">
            <div class="editor-card">
              <div class="editor-card__head"><h3 class="editor-card__title"><i class="bi bi-telephone me-2"></i>Editar Contato</h3></div>
              <div class="editor-card__body">
                <form @submit.prevent="saveContact">
                  <div class="mb-3"><label class="form-label fw-semibold">Título</label><input type="text" class="form-control" v-model="contact.title"></div>
                  <div class="mb-3"><label class="form-label fw-semibold">Subtítulo</label><input type="text" class="form-control" v-model="contact.subtitle"></div>
                  <div class="row g-3">
                    <div class="col-md-6"><label class="form-label fw-semibold">Telefone</label><input type="text" class="form-control" v-model="contact.phone"></div>
                    <div class="col-md-6"><label class="form-label fw-semibold">E-mail</label><input type="email" class="form-control" v-model="contact.email"></div>
                  </div>
                  <div class="mb-3 mt-3"><label class="form-label fw-semibold">Endereço</label><textarea class="form-control" rows="2" v-model="contact.address"></textarea></div>
                  <div class="mb-3"><label class="form-label fw-semibold">Horário de Atendimento</label><textarea class="form-control" rows="2" v-model="contact.hours"></textarea></div>
                  <button type="submit" class="btn btn-save w-100" :disabled="saving"><i class="bi bi-check2-circle me-2"></i>Salvar Contato</button>
                </form>
              </div>
            </div>
          </div>

          <!-- ═══ FOOTER ═══ -->
          <div class="tab-pane fade" id="footer-content">
            <div class="editor-card">
              <div class="editor-card__head"><h3 class="editor-card__title"><i class="bi bi-footer me-2"></i>Editar Rodapé</h3></div>
              <div class="editor-card__body">
                <form @submit.prevent="saveFooter">
                  <div class="mb-3"><label class="form-label fw-semibold">Label do CTA</label><input type="text" class="form-control" v-model="footer.ctaLabel"></div>
                  <div class="mb-3"><label class="form-label fw-semibold">Título do CTA</label><input type="text" class="form-control" v-model="footer.ctaTitle"></div>
                  <div class="mb-3"><label class="form-label fw-semibold">Texto do Botão</label><input type="text" class="form-control" v-model="footer.ctaButton"></div>
                  <label class="form-label fw-semibold">Redes Sociais</label>
                  <div v-for="(s, i) in footer.social" :key="i" class="row g-2 mb-2 align-items-center">
                    <div class="col-4"><input type="text" class="form-control form-control-sm" v-model="s.name" placeholder="Nome"></div>
                    <div class="col-4"><input type="text" class="form-control form-control-sm" v-model="s.icon" placeholder="bi bi-instagram"></div>
                    <div class="col-3"><input type="text" class="form-control form-control-sm" v-model="s.url" placeholder="URL"></div>
                    <div class="col-1"><button type="button" class="btn btn-sm btn-outline-danger w-100" @click="footer.social.splice(i,1)"><i class="bi bi-trash"></i></button></div>
                  </div>
                  <button type="button" class="btn btn-add btn-sm mb-3" @click="footer.social.push({ name:'', icon:'bi bi-', url:'' })"><i class="bi bi-plus-lg me-1"></i>Adicionar social</button>
                  <label class="form-label fw-semibold">Links de Navegação</label>
                  <div v-for="(n, i) in footer.nav" :key="i" class="row g-2 mb-2 align-items-center">
                    <div class="col-5"><input type="text" class="form-control form-control-sm" v-model="n.label" placeholder="Rótulo"></div>
                    <div class="col-5"><input type="text" class="form-control form-control-sm" v-model="n.target" placeholder="alvo (id)"></div>
                    <div class="col-2"><button type="button" class="btn btn-sm btn-outline-danger w-100" @click="footer.nav.splice(i,1)"><i class="bi bi-trash"></i></button></div>
                  </div>
                  <button type="button" class="btn btn-add btn-sm mb-3" @click="footer.nav.push({ label:'', target:'' })"><i class="bi bi-plus-lg me-1"></i>Adicionar link</button>
                  <button type="submit" class="btn btn-save w-100" :disabled="saving"><i class="bi bi-check2-circle me-2"></i>Salvar Rodapé</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Toast -->
    <transition name="toast">
      <div v-if="toast.show" class="admin-toast" :class="`admin-toast--${toast.type}`" role="alert">
        <i class="bi" :class="toast.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'"></i>
        <span>{{ toast.message }}</span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useContentStore } from '@/stores/content'

const router = useRouter()
const authStore = useAuthStore()
const contentStore = useContentStore()

const saving = ref(false)
const toast = reactive({ show: false, type: 'success', message: '' })
let toastTimer = null
function showToast(type, message) {
  toast.show = true; toast.type = type; toast.message = message
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toast.show = false), 3500)
}

// Local editable copies
const site = reactive({ ...contentStore.content.site })
const navbar = reactive({ brand: '', ctaLabel: '', items: [] })
const hero = reactive({ titleLine1: '', titleLine2: '', titleLine3: '', ctaLabel: '', image: '' })
const sections = reactive([])
const about = reactive({ title: '', text: '', approachTitle: '', approaches: [], image: '' })
const services = reactive({ title: '', subtitle: '', items: [], faqTitle: '', faqs: [] })
const contact = reactive({ title: '', subtitle: '', phone: '', email: '', address: '', hours: '' })
const footer = reactive({ ctaLabel: '', ctaTitle: '', ctaButton: '', social: [], nav: [] })

const showAddSection = ref(false)
const newSection = reactive({ title: '', type: 'custom' })

function syncFromStore() {
  Object.assign(site, contentStore.content.site)
  navbar.brand = contentStore.content.navbar.brand
  navbar.ctaLabel = contentStore.content.navbar.ctaLabel
  navbar.items = JSON.parse(JSON.stringify(contentStore.content.navbar.items))
  Object.assign(hero, contentStore.content.hero)
  sections.splice(0, sections.length, ...JSON.parse(JSON.stringify(contentStore.content.sections)))
  Object.assign(about, contentStore.content.about)
  about.approaches = JSON.parse(JSON.stringify(contentStore.content.about.approaches))
  Object.assign(services, contentStore.content.services)
  services.items = JSON.parse(JSON.stringify(contentStore.content.services.items))
  services.faqs = JSON.parse(JSON.stringify(contentStore.content.services.faqs))
  Object.assign(contact, contentStore.content.contact)
  Object.assign(footer, contentStore.content.footer)
  footer.social = JSON.parse(JSON.stringify(contentStore.content.footer.social))
  footer.nav = JSON.parse(JSON.stringify(contentStore.content.footer.nav))
  // helper field for features textarea
  services.items.forEach((s) => { s._features = (s.features || []).join('\n') })
}

onMounted(async () => {
  await authStore.checkAuth()
  if (!authStore.isAuthenticated) { router.push('/login'); return }
  await contentStore.fetchContent()
  syncFromStore()
})

onUnmounted(() => { if (toastTimer) clearTimeout(toastTimer) })

const handleLogout = async () => { await authStore.logout(); router.push('/') }

const handleImageUpload = async (event, type) => {
  const file = event.target.files[0]
  if (!file) return
  const result = await contentStore.uploadImage(file)
  if (result.success) {
    if (type === 'hero') hero.image = result.url
    if (type === 'about') about.image = result.url
    showToast('success', 'Imagem enviada!')
  } else showToast('error', result.error)
}

// Save helpers
async function persist(key, data) {
  saving.value = true
  const res = await contentStore.updateContent(key, data)
  saving.value = false
  showToast(res.success ? 'success' : 'error', res.success ? 'Salvo com sucesso!' : res.error)
  return res
}

const saveSite = () => persist('site', { ...site })
const saveNavbar = () => persist('navbar', { brand: navbar.brand, ctaLabel: navbar.ctaLabel, items: navbar.items })
const saveHero = () => persist('hero', { ...hero })
const saveAbout = () => {
  about.approaches = about.approaches.filter((a) => a.title || a.desc)
  persist('about', { title: about.title, text: about.text, approachTitle: about.approachTitle, approaches: about.approaches, image: about.image })
}
const saveServices = () => {
  services.items.forEach((s) => { s.features = (s._features || '').split('\n').map((f) => f.trim()).filter(Boolean) })
  persist('services', { title: services.title, subtitle: services.subtitle, items: services.items, faqTitle: services.faqTitle, faqs: services.faqs })
}
const saveContact = () => persist('contact', { ...contact })
const saveFooter = () => persist('footer', { ctaLabel: footer.ctaLabel, ctaTitle: footer.ctaTitle, ctaButton: footer.ctaButton, social: footer.social, nav: footer.nav })

// Sections
const saveSections = () => { contentStore.content.sections = JSON.parse(JSON.stringify(sections)); contentStore.updateContent('sections', JSON.parse(JSON.stringify(sections))) }
const toggleSection = (section) => { contentStore.toggleSection(section.id, section.enabled); showToast('success', `Seção ${section.enabled ? 'ativada' : 'desativada'}`) }
const moveSection = (id, dir) => { contentStore.moveSection(id, dir); syncFromStore() }
const removeSection = (section) => {
  if (confirm(`Remover a seção "${section.title || section.type}"?`)) {
    contentStore.removeSection(section.id); syncFromStore(); showToast('success', 'Seção removida')
  }
}
function ensureSectionContent(section) {
  if (!section.content) section.content = {}
  const t = section.type
  if (t === 'custom' && !section.content.heading) { section.content.label = ''; section.content.heading = ''; section.content.body = ''; section.content.ctaLabel = ''; section.content.cards = [] }
  if (t === 'schedule' && !section.content.heading) { section.content.label = 'Agende Sua Consulta'; section.content.heading = 'Escolha o melhor <span class="accent">horário para você.</span>'; section.content.description = ''; section.content.calendarUrl = '' }
  if (t === 'reviews' && !section.content.heading) { section.content.label = 'Experiência & Cuidado'; section.content.heading = 'Relatos de <span class="accent">quem já passou</span> por aqui.'; section.content.rating = '5.0 / 5.0'; section.content.reviews = [] }
  if (t === 'faq' && !section.content.heading) { section.content.label = 'Dúvidas Frequentes'; section.content.heading = 'Tudo o que você <span class="accent">precisa saber.</span>'; section.content.faqs = [] }
  if (t === 'perspective' && !section.content.heading) { section.content.label = 'Perspectiva & Cuidado'; section.content.heading = 'Você já considerou ou precisou buscar ajuda <span class="accent">psicológica?</span>'; section.content.image = ''; section.content.bullets = []; section.content.conclusion = '' }
  if (t === 'approach' && !section.content.heading) { section.content.label = 'O Diferencial'; section.content.heading = 'Um cuidado focado <span class="accent">na sua trajetória.</span>'; section.content.intro = ''; section.content.pillars = [] }
}
const addNewSection = () => {
  if (!newSection.title) { showToast('error', 'Informe um título'); return }
  const id = 'sec' + Date.now()
  const section = { id, type: newSection.type, title: newSection.title, enabled: true, content: {} }
  ensureSectionContent(section)
  contentStore.addSection(section)
  syncFromStore()
  showToast('success', 'Seção adicionada')
  newSection.title = ''; newSection.type = 'custom'; showAddSection.value = false
}
</script>

<style scoped>
.admin-view { min-height: 100vh; background: #F8F4F0; font-family: 'Inter', -apple-system, sans-serif; color: #5D4E37; }
.admin-header { background: linear-gradient(135deg, #6B3A2E 0%, #8B5A4B 100%); color: #F8F4F0; padding: 1.5rem 0; box-shadow: 0 4px 24px rgba(107,58,46,0.18); }
.admin-header__inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
.admin-header__brand { display: flex; align-items: center; gap: 1rem; }
.admin-header__logo { width: 48px; height: 48px; border-radius: 14px; background: rgba(248,244,240,0.15); display: flex; align-items: center; justify-content: center; font-size: 1.4rem; }
.admin-header__title { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; margin: 0; }
.admin-header__subtitle { margin: 0; opacity: 0.75; font-size: 0.85rem; }
.admin-header__actions { display: flex; gap: 0.6rem; }
.btn-soft { background: rgba(248,244,240,0.15); color: #F8F4F0; border: none; padding: 0.5rem 1.1rem; border-radius: 50px; font-weight: 600; font-size: 0.8rem; transition: all 0.3s ease; }
.btn-soft:hover { background: rgba(248,244,240,0.28); color: #F8F4F0; }

.admin-tabs .nav-link { background: #fff; color: #5D4E37; border: 1px solid rgba(201,168,130,0.2); border-radius: 50px !important; margin: 0 0.4rem 0.4rem 0; font-weight: 600; font-size: 0.8rem; padding: 0.5rem 1.1rem; transition: all 0.3s ease; }
.admin-tabs .nav-link.active { background: #6B3A2E; color: #F8F4F0; border-color: #6B3A2E; box-shadow: 0 6px 18px rgba(107,58,46,0.25); }

.editor-card { background: #fff; border-radius: 18px; overflow: hidden; box-shadow: 0 8px 30px rgba(93,78,55,0.07); border: 1px solid rgba(201,168,130,0.12); margin-bottom: 1.5rem; }
.editor-card__head { background: linear-gradient(135deg, #F8F4F0 0%, #EDE8E1 100%); padding: 1rem 1.4rem; border-bottom: 1px solid rgba(201,168,130,0.15); }
.editor-card__title { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; color: #6B3A2E; margin: 0; }
.editor-card__body { padding: 1.4rem; }
.form-control, .form-select { border-radius: 10px; border-color: rgba(93,78,55,0.15); padding: 0.55rem 0.9rem; }
.form-control:focus, .form-select:focus { border-color: #C9A882; box-shadow: 0 0 0 0.2rem rgba(201,168,130,0.2); }

.btn-save { background: #6B3A2E; color: #F8F4F0; border: none; border-radius: 50px; padding: 0.65rem 1.5rem; font-weight: 700; font-size: 0.82rem; transition: all 0.3s ease; box-shadow: 0 6px 20px rgba(107,58,46,0.22); }
.btn-save:hover:not(:disabled) { background: #8B5A4B; color: #F8F4F0; transform: translateY(-1px); }
.btn-save:disabled { opacity: 0.7; }
.btn-add { background: #C9A882; color: #fff; border: none; border-radius: 50px; font-weight: 600; padding: 0.35rem 0.9rem; transition: all 0.3s ease; }
.btn-add:hover { background: #B8956A; color: #fff; }

.upload-zone { position: relative; border: 2px dashed rgba(201,168,130,0.5); border-radius: 14px; min-height: 150px; display: flex; align-items: center; justify-content: center; overflow: hidden; cursor: pointer; background: #FCFAF7; transition: all 0.3s ease; }
.upload-zone:hover { border-color: #C9A882; background: #F8F4F0; }
.upload-zone--avatar { min-height: 180px; }
.upload-zone__preview { width: 100%; height: 100%; max-height: 240px; object-fit: cover; }
.upload-zone__preview--avatar { max-height: 200px; }
.upload-zone__placeholder { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; color: #B8956A; }
.upload-zone__placeholder i { font-size: 2rem; }
.upload-zone__input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
.upload-zone__remove { position: absolute; bottom: 0.6rem; right: 0.6rem; z-index: 2; }

.preview-card { background: #fff; border-radius: 18px; padding: 1.2rem; box-shadow: 0 8px 30px rgba(93,78,55,0.07); border: 1px solid rgba(201,168,130,0.12); }
.preview-card__tag { display: inline-flex; align-items: center; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #8B7A66; background: #F8F4F0; padding: 0.3rem 0.8rem; border-radius: 50px; margin-bottom: 1rem; }
.hero-preview { position: relative; min-height: 240px; border-radius: 14px; overflow: hidden; background: linear-gradient(135deg, #F8F4F0 0%, #E0D5C5 100%); background-size: cover; background-position: center; display: flex; align-items: flex-end; }
.hero-preview__overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(107,58,46,0.85), rgba(107,58,46,0.25)); }
.hero-preview__content { position: relative; z-index: 2; padding: 1.5rem; color: #F8F4F0; }
.hero-preview__title { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 700; line-height: 1.15; }
.hero-preview__cta { display: inline-block; background: #C9A882; color: #6B3A2E; font-weight: 700; font-size: 0.75rem; padding: 0.5rem 1.2rem; border-radius: 50px; margin-top: 0.8rem; }
.about-preview { text-align: center; padding: 0.5rem; }
.about-preview__avatar { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin: 0 auto 1rem; border: 3px solid #C9A882; display: block; }
.about-preview__avatar--empty { background: #F8F4F0; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; color: #C9A882; }
.about-preview__text { font-size: 0.85rem; color: #5D4E37; line-height: 1.6; text-align: left; }

.service-edit-card { background: #FCFAF7; border: 1px solid rgba(201,168,130,0.18); border-radius: 14px; padding: 1rem; margin-bottom: 1rem; }
.service-edit-card__head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.7rem; }
.service-edit-card__num { font-weight: 700; color: #C9A882; font-family: 'Playfair Display', serif; }

.section-manage-card { background: #fff; border: 1px solid rgba(201,168,130,0.18); border-radius: 14px; padding: 1rem; margin-bottom: 1rem; }
.section-manage-card__head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.8rem; }
.section-manage-card__actions { display: flex; gap: 0.4rem; }
.section-manage-card__body { border-top: 1px solid rgba(201,168,130,0.12); padding-top: 0.8rem; }
.add-section-box { background: #FCFAF7; border: 1px dashed rgba(201,168,130,0.4); border-radius: 14px; padding: 1rem; }

.admin-toast { position: fixed; bottom: 2rem; right: 2rem; z-index: 2000; display: flex; align-items: center; gap: 0.7rem; padding: 0.9rem 1.4rem; border-radius: 14px; color: #fff; font-weight: 600; font-size: 0.88rem; box-shadow: 0 10px 40px rgba(0,0,0,0.2); }
.admin-toast--success { background: #6B8E6B; }
.admin-toast--error { background: #B5564B; }
.admin-toast i { font-size: 1.2rem; }
.toast-enter-active, .toast-leave-active { transition: all 0.4s cubic-bezier(0.16,1,0.3,1); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(20px); }
</style>
